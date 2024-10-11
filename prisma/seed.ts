import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rules = [
  { tag: 'noSmoking', value: 'Proibido fumar' },
  { tag: 'noAlcohol', value: 'Proibido bebidas alcóolicas' },
  { tag: 'noParties', value: 'Proibido festas' },
  { tag: 'noPets', value: 'Proibido animais de estimação' },
  { tag: 'noNoiseAfter10', value: 'Proibido barulho após às 22h' },
  { tag: 'noUncleanAreas', value: 'Proibido deixar áreas comuns sujas' },
  { tag: 'noSharingKeys', value: 'Proibido compartilhar chaves' },
  { tag: 'noOvernightGuests', value: 'Proibido convidados pernoitarem' },
];

const amenities = [
  { tag: 'furnishedResidence', value: 'Residência mobiliada' },
  { tag: 'garage', value: 'Garagem' },
  { tag: 'airConditioning', value: 'Ar-condicionado' },
  { tag: 'swimmingPool', value: 'Piscina' },
  { tag: 'gym', value: 'Academia' },
  { tag: 'nearbyMarket', value: 'Mercado próximo' },
  { tag: 'laundry', value: 'Lavanderia' },
  { tag: 'publicTransportNearby', value: 'Transporte público próximo' },
];

async function main() {
  console.log('Seeding rules...');
  for (const rule of rules) {
    await prisma.rule.upsert({
      where: { tag: rule.tag },
      update: {},
      create: rule,
    });
  }

  console.log('Seeding amenities...');
  for (const amenity of amenities) {
    await prisma.amenity.upsert({
      where: { tag: amenity.tag },
      update: {},
      create: amenity,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
