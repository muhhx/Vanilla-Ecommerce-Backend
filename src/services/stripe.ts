import Stripe from "stripe";
import config from "config";
import IProduct from "../interfaces/product.interface";
import IItem from "../interfaces/item.interface";

const stripeSecretKey = config.get<string>("stripeSecretKey");

const stripe = new Stripe(
  "sk_test_51LI1eSA7ejTKC87iCu8DqBFlVOmfcfy0XrA8T3K5yfu7APNmhrNr34Ntv49fNc8rmYyZmxZ1GpDpbFq6AHNkDhPn00uvNrlPff",
  {
    apiVersion: "2020-08-27",
  }
);

export const createSessionStripe = async (
  final: { product: IProduct; cart: IItem }[]
) => {
  const baseUrl = config.get<string>("baseUrl");
  const stripeSuccessUrl = config.get<string>("stripeSuccessUrl");
  const stripeCancelUrl = config.get<string>("stripeCancelUrl");

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
      success_url: `${baseUrl}/${stripeSuccessUrl}`,
      cancel_url: `${baseUrl}/${stripeCancelUrl}`,
    });

    return session;
  } catch (error) {
    return error;
  }
};
