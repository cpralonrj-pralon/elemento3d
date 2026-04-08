require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Middlewares
app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

// ─── POST /create-checkout-session ──────────────────────────────────────────
// Recebe os itens do carrinho e cria uma Stripe Checkout Session
app.post('/create-checkout-session', async (req, res) => {
  const { items } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'Carrinho vazio.' });
  }

  try {
    // Converte cada item do carrinho para o formato do Stripe
    const line_items = items.map((item) => ({
      price_data: {
        currency: 'brl',
        product_data: {
          name: item.name,
          description: `Elemento 3D - Produzido em impressão 3D`,
          // Stripe aceita URLs de imagem publicamente acessíveis
          // Em produção, substitua pela URL real da imagem no seu servidor
          images: [],
        },
        // Stripe usa centavos (sem decimais)
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.qty,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      // Redireciona para estas páginas após o pagamento
      success_url: `${FRONTEND_URL}/pedido-confirmado?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${FRONTEND_URL}/checkout?cancelado=true`,
      // Metadados opcionais
      metadata: {
        source: 'elemento-3d-ecommerce',
      },
      // Opções de pagamento
      payment_intent_data: {
        description: 'Compra na Elemento 3D',
      },
      // Localização em português
      locale: 'pt-BR',
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Erro ao criar sessão Stripe:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ─── POST /webhook ───────────────────────────────────────────────────────────
// Endpoint para receber eventos do Stripe (pagamentos confirmados, etc.)
// Em produção: configurar no painel Stripe → Webhooks
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (webhookSecret) {
    try {
      const event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
      
      switch (event.type) {
        case 'checkout.session.completed':
          const session = event.data.object;
          console.log('✅ Pagamento confirmado! Session ID:', session.id);
          // Aqui: salvar pedido no banco de dados
          break;
        case 'payment_intent.payment_failed':
          console.log('❌ Pagamento falhou.');
          break;
      }
    } catch (err) {
      console.error('Webhook error:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
  }

  res.json({ received: true });
});

// ─── GET /session-status ─────────────────────────────────────────────────────
// Retorna status da sessão para a página de confirmação
app.get('/session-status', async (req, res) => {
  const { session_id } = req.query;

  if (!session_id) {
    return res.status(400).json({ error: 'session_id obrigatório.' });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    res.json({
      status: session.payment_status,
      customer_email: session.customer_details?.email,
      amount_total: session.amount_total / 100,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Healthcheck ──────────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'ok', stripe: !!process.env.STRIPE_SECRET_KEY });
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Servidor Elemento 3D rodando em http://localhost:${PORT}`);
  console.log(`🔗 Frontend em: ${FRONTEND_URL}`);
  console.log(`🔑 Stripe: ${process.env.STRIPE_SECRET_KEY ? '✅ Chave configurada' : '❌ Chave não encontrada!'}\n`);
});
