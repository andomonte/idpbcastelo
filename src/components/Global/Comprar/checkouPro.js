import React, { useEffect } from 'react';
import { useMercadopago } from 'react-sdk-mercadopago';

export default function CheckoutPro({ prefID }) {
  const mercadopago = useMercadopago.v2(
    'TEST-e965cf2f-8b17-4a13-871e-947e26f87ebd',
    {
      locale: 'pt-BR',
    },
  );
  console.log('vai:', prefID);
  useEffect(() => {
    if (mercadopago) {
      mercadopago.checkout({
        preference: {
          id: prefID,
        },
        render: {
          container: '.cho-container',
          label: 'Pay',
        },
      });
    }
  }, [mercadopago]);

  return (
    <div>
      <div className="cho-container" />
    </div>
  );
}
