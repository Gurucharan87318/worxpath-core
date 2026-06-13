import { PrismaClient, ChallengeType } from "@prisma/client";

const prisma = new PrismaClient();

type OperationalDaySeed = {
  dayNumber: number;
  type: ChallengeType;
  title: string;
  brandContext: string;
  summary: string;
  objective: string;
  starterCode: string;
  solution: string;
};

const SQL_FOUNDATIONS_SLUG = "sql-foundations";

const twelveDaysData: OperationalDaySeed[] = [
  {
    dayNumber: 1,
    type: ChallengeType.SQL,
    title: "Structured Data Schemas and Table Topology",
    brandContext: "Environment Init",
    summary:
      "Start the track by understanding how analyst-facing datasets are organized. You will inspect mock business tables, identify grain, and understand how fact and dimension tables shape reliable downstream queries.",
    objective:
      "Identify table purpose, distinguish primary and foreign keys, and explain how a clean schema reduces reporting ambiguity before any SQL analysis begins.",
    starterCode: `-- Day 1: inspect schema foundations
SELECT table_name, column_name, data_type
FROM information_schema.columns
WHERE table_schema = 'public'
ORDER BY table_name, ordinal_position;`,
    solution:
      `SELECT table_name, column_name, data_type FROM information_schema.columns WHERE table_schema = 'public' ORDER BY table_name, ordinal_position;`,
  },
  {
    dayNumber: 2,
    type: ChallengeType.SQL,
    title: "Filtering Data Pipelines with Explicit Operators",
    brandContext: "Relational Algebra",
    summary:
      "Move from structure into retrieval. This day introduces practical filtering so the learner can isolate specific regions, customers, dates, and status ranges from larger operational datasets.",
    objective:
      "Write accurate WHERE clauses using equality, comparison, IN, BETWEEN, LIKE, and NULL-safe logic to pull only the rows relevant to a clear business question.",
    starterCode: `-- Day 2: filter operational records
SELECT order_id, customer_id, region, status, order_total
FROM sales_orders
WHERE region = 'South'
  AND status IN ('paid', 'shipped')
  AND order_total >= 500
ORDER BY order_total DESC;`,
    solution:
      `SELECT order_id, customer_id, region, status, order_total FROM sales_orders WHERE region = 'South' AND status IN ('paid', 'shipped') AND order_total >= 500 ORDER BY order_total DESC;`,
  },
  {
    dayNumber: 3,
    type: ChallengeType.RESILIENCE,
    title: "Managing Vague Scope Variance Under Pressure",
    brandContext: "Communication Engine",
    summary:
      "Analysts often receive rushed and poorly framed requests. This day simulates an unclear stakeholder ask and trains the learner to clarify goals, reduce ambiguity, and avoid building the wrong output.",
    objective:
      "Choose a response path that clarifies business intent, confirms metric definitions, and preserves trust without sounding defensive or rigid under time pressure.",
    starterCode: "",
    solution: "",
  },
  {
    dayNumber: 4,
    type: ChallengeType.SQL,
    title: "Aggregation Modeling Through Grouped Metrics",
    brandContext: "Relational Algebra",
    summary:
      "This day introduces grouped reporting, where raw rows become usable summaries. You will calculate totals, counts, and averages segmented by business dimensions such as region and channel.",
    objective:
      "Use GROUP BY with aggregate functions to turn event-level data into decision-ready summaries while preserving business meaning and avoiding accidental duplication.",
    starterCode: `-- Day 4: grouped metrics by region
SELECT
  region,
  COUNT(*) as order_count,
  SUM(order_total) as revenue,
  AVG(order_total) as avg_order_value
FROM sales_orders
GROUP BY region
ORDER BY revenue DESC;`,
    solution:
      `SELECT region, COUNT(*) as order_count, SUM(order_total) as revenue, AVG(order_total) as avg_order_value FROM sales_orders GROUP BY region ORDER BY revenue DESC;`,
  },
  {
    dayNumber: 5,
    type: ChallengeType.SQL,
    title: "Subquery Mechanics versus Explicit Joining",
    brandContext: "Relational Algebra",
    summary:
      "Not every business question is solved with a single flat query. Today focuses on when to use subqueries for intermediate filtering and when joins provide a cleaner, more explainable answer.",
    objective:
      "Compare subqueries and joins on readability, correctness, and reuse, then use both patterns to answer a common analyst workflow question safely.",
    starterCode: `-- Day 5: compare customer spend to segment average
SELECT c.customer_id, c.segment, s.total_spend
FROM customers c
JOIN (
  SELECT customer_id, SUM(order_total) as total_spend
  FROM sales_orders
  GROUP BY customer_id
) s ON s.customer_id = c.customer_id;`,
    solution:
      `SELECT c.customer_id, c.segment, s.total_spend FROM customers c JOIN ( SELECT customer_id, SUM(order_total) as total_spend FROM sales_orders GROUP BY customer_id ) s ON s.customer_id = c.customer_id;`,
  },
  {
    dayNumber: 6,
    type: ChallengeType.WEALTH,
    title: "Runway Protection Foundations and Basic Budgeting",
    brandContext: "Financial Simulation",
    summary:
      "Career growth becomes more stable when personal runway is visible. This day introduces basic cash planning so the learner can understand how study time, income, and monthly spend affect skill-building sustainability.",
    objective:
      "Adjust income and expense assumptions to estimate a simple 100-day runway and explain how financial stability can support deeper career transitions.",
    starterCode: "",
    solution: "",
  },
  {
    dayNumber: 7,
    type: ChallengeType.SQL,
    title: "String Parsing and Regular Expression Filters",
    brandContext: "SQL Advanced",
    summary:
      "Messy text appears everywhere in analyst work, from transaction memos to support notes. This day teaches cleanup patterns for extracting consistent values from inconsistent text fields.",
    objective:
      "Use text functions and regular expressions to normalize raw strings, extract useful tokens, and prepare previously messy records for downstream analysis.",
    starterCode: `-- Day 7: extract normalized merchant tokens
SELECT
  transaction_id,
  raw_description
FROM bank_transactions;`,
    solution:
      `SELECT transaction_id, raw_description FROM bank_transactions;`,
  },
  {
    dayNumber: 8,
    type: ChallengeType.SQL,
    title: "Conditional Routing with CASE Expressions",
    brandContext: "SQL Advanced",
    summary:
      "Business logic often depends on thresholds, categories, and routing rules. This day introduces CASE expressions so the learner can classify records into useful strategic buckets.",
    objective:
      "Build conditional logic directly in SQL to segment records into categories such as high-value customers, at-risk accounts, or low-performing regions.",
    starterCode: `-- Day 8: dynamic value bucketing
SELECT
  customer_id,
  lifetime_value
FROM customer_value_snapshot;`,
    solution:
      `SELECT customer_id, lifetime_value FROM customer_value_snapshot;`,
  },
  {
    dayNumber: 9,
    type: ChallengeType.RESILIENCE,
    title: "Handling Code Reviews and Critical Feedback",
    brandContext: "Corporate Culture",
    summary:
      "Strong analysts need technical skill and emotional steadiness. This day simulates critical review feedback and helps the learner respond with accountability, clarity, and calm prioritization.",
    objective:
      "Select the best response to critique, separate signal from tone, and preserve working trust while still moving the analysis forward effectively.",
    starterCode: "",
    solution: "",
  },
  {
    dayNumber: 10,
    type: ChallengeType.SQL,
    title: "Indexing Foundations and Table Scan Constraints",
    brandContext: "Optimization",
    summary:
      "As datasets grow, correctness alone is not enough. This day introduces how indexes influence read speed and why some queries force expensive scans when filter and sort patterns are not supported.",
    objective:
      "Explain when an index helps, identify likely scan-heavy patterns, and improve a query path by aligning predicates with available structures.",
    starterCode: `-- Day 10: inspect query pattern
SELECT customer_id, created_at FROM sales_orders;`,
    solution:
      `SELECT customer_id, created_at FROM sales_orders;`,
  },
  {
    dayNumber: 11,
    type: ChallengeType.SQL,
    title: "Window Analytics Functions and Partition Bounds",
    brandContext: "Optimization",
    summary:
      "Analyst workflows often require ranking, running totals, and comparisons within groups. This day introduces window functions as a cleaner alternative to many nested self-joins.",
    objective:
      "Use OVER, PARTITION BY, and ORDER BY to compute rankings, rolling metrics, and group-aware comparisons without collapsing row-level detail.",
    starterCode: `-- Day 11: running revenue by region
SELECT
  region,
  order_date
FROM sales_orders;`,
    solution:
      `SELECT region, order_date FROM sales_orders;`,
  },
  {
    dayNumber: 12,
    type: ChallengeType.WEALTH,
    title: "Effective Micro-Contract Pricing Design",
    brandContext: "Asset Allocation",
    summary:
      "This day shifts to income design. The learner evaluates how small freelance or consulting work can support a transition into analyst roles without destabilizing long-term learning progress.",
    objective:
      "Balance effort, pricing, and time allocation to estimate whether small side work can improve financial stability without eroding the consistency needed for skill growth.",
    starterCode: "",
    solution: "",
  },
];

async function main() {
  console.log("🌱 Commencing unified database seeding operation...");

  const user = await prisma.user.upsert({
    where: { email: "gurucharan87318@gmail.com" },
    update: {},
    create: {
      clerkId: "user_3EvnIrUdfpwUDLVlH56zsiNveTA",
      email: "gurucharan87318@gmail.com",
      name: "Gurucharan Senthilkumar",
      profile: {
        create: {
          onboardingComplete: true,
          currentDayNumber: 1,
        },
      },
    },
  });

  const track = await prisma.track.upsert({
    where: { slug: SQL_FOUNDATIONS_SLUG },
    update: {
      title: "Data Analyst Foundations",
      description:
        "A structured 100-day analyst path that combines technical SQL progression with resilience and wealth checkpoints.",
      totalDays: 100,
    },
    create: {
      slug: SQL_FOUNDATIONS_SLUG,
      title: "Data Analyst Foundations",
      description:
        "A structured 100-day analyst path that combines technical SQL progression with resilience and wealth checkpoints.",
      totalDays: 100,
    },
  });

  let moduleRecord = await prisma.module.findFirst({
    where: {
      trackId: track.id,
      order: 1,
    },
  });

  if (!moduleRecord) {
    moduleRecord = await prisma.module.create({
      data: {
        trackId: track.id,
        title: "SQL & Core Professional Competencies",
        description: "Core structural curriculum data requirements",
        order: 1,
      },
    });
  } else {
    moduleRecord = await prisma.module.update({
      where: { id: moduleRecord.id },
      data: {
        title: "SQL & Core Professional Competencies",
        description: "Core structural curriculum data requirements",
      },
    });
  }

  for (const dayData of twelveDaysData) {
    const day = await prisma.day.upsert({
      where: {
        moduleId_dayNumber: {
          moduleId: moduleRecord.id,
          dayNumber: dayData.dayNumber,
        },
      },
      update: {
        title: dayData.title,
        readingMd: `${dayData.summary}\n\n### Objective:\n${dayData.objective}`,
        xpReward: 50,
      },
      create: {
        moduleId: moduleRecord.id,
        dayNumber: dayData.dayNumber,
        title: dayData.title,
        readingMd: `${dayData.summary}\n\n### Objective:\n${dayData.objective}`,
        xpReward: 50,
      },
    });

    await prisma.challenge.upsert({
      where: {
        id: `challenge-seed-day-${dayData.dayNumber}`,
      },
      update: {
        dayId: day.id,
        type: dayData.type,
        prompt: dayData.objective,
        starterCode: dayData.starterCode,
        solution: dayData.solution,
        xpReward: 25,
        order: 1,
      },
      create: {
        id: `challenge-seed-day-${dayData.dayNumber}`,
        dayId: day.id,
        type: dayData.type,
        prompt: dayData.objective,
        starterCode: dayData.starterCode,
        solution: dayData.solution,
        xpReward: 25,
        order: 1,
      },
    });

    await prisma.learningProgress.upsert({
      where: {
        userId_dayId: {
          userId: user.id,
          dayId: day.id,
        },
      },
      update: {
        completed: false,
        xpEarned: 0,
      },
      create: {
        userId: user.id,
        dayId: day.id,
        completed: false,
        xpEarned: 0,
      },
    });
  }

  await prisma.userProfile.upsert({
    where: { userId: user.id },
    update: {
      activeTrackId: track.id,
      currentDayNumber: 1,
      onboardingComplete: true,
    },
    create: {
      userId: user.id,
      activeTrackId: track.id,
      currentDayNumber: 1,
      onboardingComplete: true,
    },
  });

  console.log(
    `\n✅ Seeding success! Bound "${track.title}" curriculum array directly down to User: ${user.email}`,
  );
}

main()
  .catch((e) => {
    console.error("❌ Seeding operation terminated prematurely:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });