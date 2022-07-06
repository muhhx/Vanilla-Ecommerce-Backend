import Stripe from "stripe";
import IProduct from "../interfaces/product.interface";
import IItem from "../interfaces/item.interface";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY as string;

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2020-08-27",
});

export const createSessionStripe = async (
  final: { product: IProduct; cart: IItem }[]
) => {
  const baseUrl = process.env.BASE_URL as string;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "boleto"],
      mode: "payment",
      line_items: final.map(({ product, cart }) => {
        return {
          price_data: {
            currency: "brl",
            product_data: {
              name: product.name,
              description: `${product.options[cart.colorIndex].name} - ${
                cart.size
              }`,
              images: [`${product.options[cart.colorIndex].images[0].url}`],
            },
            unit_amount: product.hasDiscount
              ? product.discountPrice
              : product.price,
          },
          quantity: cart.quantity,
        };
      }),
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/cart`,
    });

    return session;
  } catch (error) {
    return error;
  }
};
