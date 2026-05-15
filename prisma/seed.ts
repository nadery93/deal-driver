import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "demo@dealdriver.com" },
    update: {},
    create: {
      email: "demo@dealdriver.com",
      name: "Demo Shopper",
      phone: "555-0100"
    }
  });

  const dealer = await prisma.dealer.create({
    data: {
      name: "Lone Star BMW",
      city: "Austin",
      state: "TX",
      zipCode: "78745",
      email: "internet@lonestarbmw.example",
      fees: 395
    }
  });

  const vehicle = await prisma.vehicle.create({
    data: {
      year: 2025,
      make: "BMW",
      model: "i4",
      trim: "eDrive40",
      bodyStyle: "Sedan",
      powertrain: "EV",
      msrp: 62195
    }
  });

  const promotion = await prisma.dealerPromotion.create({
    data: {
      vehicleId: vehicle.id,
      dealerId: dealer.id,
      type: "Lease",
      monthlyPayment: 489,
      dueAtSigning: 2999,
      term: 36,
      mileage: 10000,
      moneyFactor: 0.00158,
      msrp: 62195,
      sellingPrice: 54875,
      incentives: 7500,
      dealerFees: 395,
      creditTier: "Tier 1",
      evTaxCredit: true,
      sourceUrl: "https://example.com/lone-star-bmw-i4"
    }
  });

  await prisma.dealScore.create({
    data: {
      vehicleId: vehicle.id,
      dealerPromotionId: promotion.id,
      score: 92,
      label: "Excellent Deal",
      discountComponent: 15.3,
      paymentComponent: 18.4,
      rateComponent: 13.1,
      incentiveComponent: 14,
      feePenalty: 1.6,
      communityComponent: 9.8,
      confidence: 91
    }
  });

  await prisma.offerCampaign.create({
    data: {
      userId: user.id,
      vehicleSummary: "2025 BMW i4 eDrive40",
      dealType: "Lease",
      targetMonthly: 479,
      targetDue: 2500,
      targetPrice: 54000,
      targetMoneyFactor: 0.0015,
      term: 36,
      mileage: 10000,
      zipCode: "78701",
      customMessage: "Hello, I am ready to move forward this week if you can match or beat this structure.",
      replyToEmail: "campaign-demo@reply.dealdriver.example",
      status: "ACTIVE"
    }
  });
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });
