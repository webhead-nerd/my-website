import Image from "next/image";
import { notFound } from "next/navigation";

const gradientLight = "#eaf2fb";
const gradientMid = "#a9c6e8";

type Section = { heading: string; body: string };
type Block = { sections: Section[]; images: string[]; aspectRatio?: string };
type CtaButton = { label: string; url: string; blockIndex: number; imageIndex: number };
type ProjectEntry = {
  title: string;
  blocks: Block[];
  ctaButtons: CtaButton[];
  imageFit?: "cover" | "contain";
  aspectRatio?: string;
};

const projectsData: Record<string, ProjectEntry> = {
  "project-one": {
    title: "Budget vs. Actual Variance Model",
    blocks: [
      {
        sections: [
          {
            heading: "About",
            body: "A financial reporting model that tracks Amgen's FY2025 quarterly performance against a FY2024 baseline budget, built to give finance leadership a clear, glanceable view on where the business is over or under plan. Designed so that a real finance team can use it, and simple enough for a director to understand under a minute.",
          },
          {
            heading: "The Problem",
            body: "Raw actual-vs-budget numbers don't tell a story on their own. A spreadsheet full of numbers doesn't explain deviations from the budget or what leadership should do about it. The challenge was to build a model that provided enough context with the right numbers, so it can directly aid decision-making.",
          },
        ],
        images: ["/images/projects/1.1.webp", "/images/projects/1.2.webp"],
      },
      {
        sections: [
          {
            heading: "The Process",
            body: "The model was built from FY2025 quarterly actuals against a FY2024 baseline, structured by category/metric across Q1-Q4 with full-year rollups. Calculated dollar and percentage variance for each line, then added in management notes explaining the drivers behind the larger swings - Isolating th actual trend shifts. Iterated on formatting so the biggest variances are visually obvious.",
          },
          {
            heading: "The Outcome",
            body: "A model that would actually be used in professional finance ops, quarterly and full-year variance broken down by category, and notes that make \"R&D is 21% under budget\" into an actual explainable insight. Published a LinkedIn post walking through the build and the reasoning behind it.",
          },
        ],
        images: ["/images/projects/1.3.webp", "/images/projects/1.4.webp"],
      },
    ],
    ctaButtons: [
      { label: "View on LinkedIn", url: "https://lnkd.in/p/d6BWMk-F", blockIndex: 1, imageIndex: 0 },
    ],
  },
  "project-two": {
    title: "Global E-Commerce Performance Dashboard",
    imageFit: "cover",
    aspectRatio: "1636/1080",
    blocks: [
      {
        sections: [
          {
            heading: "About",
            body: "A BI dashboard built in Tableau Public, analyzing global e-commerce transaction data to surface the KPIs a retail ops or reporting team would actually track — revenue, order volume, and performance patterns across regions and time. Designed for visibility and recruiter discoverability by publishing directly to Tableau Public rather than keeping it local.",
          },
          {
            heading: "The Problem",
            body: "E-commerce businesses generate transaction data across countries, products, and time — but without a consolidated view, teams are left manually cross-referencing spreadsheets to answer basic questions like which regions are driving revenue, where sales are slowing down, or which markets deserve more attention. That slows down decision-making and makes it easy to miss where the actual opportunity or risk is. This dashboard consolidates raw transactional data into a single view so performance patterns — by region, by time period — are visible at a glance instead of buried in rows of data.",
          },
        ],
        images: ["/images/projects/2.1.webp", "/images/projects/2.2.webp"],
      },
      {
        sections: [
          {
            heading: "The Process",
            body: "Switched the data-cleaning step from Excel to Power Query to handle the dataset's size without crashing, structuring and cleaning the raw transactional data before bringing it into Tableau. Rather than using pre-built KPI extensions like PowerKPIs, built the KPI cards natively in Tableau — giving more control over the exact look and layout instead of being boxed in by a plugin's defaults. Focused the dashboard around a geographical performance view alongside headline KPI numbers.",
          },
          {
            heading: "The Outcome",
            body: "A published, publicly viewable dashboard on Tableau Public showing global e-commerce performance through custom-built KPI cards and a geographic breakdown. Shared as a LinkedIn post to walk through the build.",
          },
        ],
        images: ["/images/projects/2.3.webp", "/images/projects/2.4.webp"],
      },
    ],
    ctaButtons: [
      { label: "View Dashboard", url: "https://public.tableau.com/views/GlobalE-CommercePerformanceDashboard/Dashboard?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link", blockIndex: 0, imageIndex: 0 },
      { label: "View on LinkedIn", url: "https://www.linkedin.com/feed/update/urn:li:activity:7492491674817052672/", blockIndex: 1, imageIndex: 0 },
    ],
  },
  "project-three": {
    title: "Process Bottleneck Analysis",
    blocks: [
      {
        sections: [
          {
            heading: "About",
            body: "A process-mining style analysis of a real loan application workflow, built to find exactly where applications were slowed down or mishandled as they moved through the process. The data used was the BPI Challenge 2017 event log, a real anonymized loan application data from a Dutch financial institution. Used SQL (PostgreSQL) as the analysis engine.",
          },
          {
            heading: "The Problem",
            body: "When a multi-step approval process like a loan application takes too long, it's often not clear why - It can be from the plethora of reasons ranging from repeats to execution delays. Without a clear view at the real reason, analysis teams end up guessing at fixes. The goal was to identify where the process was actually breaking down using the underlying event log data.",
          },
        ],
        images: ["/images/projects/3.webp"],
        aspectRatio: "1080/1080",
      },
      {
        sections: [
          {
            heading: "The Process",
            body: "Analyzed the real financial-services event log in PostgreSQL, tracing loan applications through their full lifecycle to measure cycle time at each step. Focused on 2 possible failure patterns: how long cases dwelt at each stage, and where cases were being misrouted or reworked. Isolated the stages responsible for the largest share of total cycle time and rework.",
          },
          {
            heading: "The Outcome",
            body: "A clear picture of where the loan application process was actually losing time; pinpointing the specific stages driving the longest delays and the highest rates of rework, along with a proposed fix targeting those bottlenecks directly. Published on GitHub with a detailed case-study (README file) walking through the project in detail."         },
        ],
        images: ["/images/projects/3.2.webp", "/images/projects/3.3.webp"],
        aspectRatio: "1636/1080",
      },
    ],
    ctaButtons: [
      { label: "View on LinkedIn", url: "https://lnkd.in/p/dRpeTQaz", blockIndex: 0, imageIndex: 0 },
      { label: "View on GitHub", url: "https://github.com/webhead-nerd/Claims-Process-Bottleneck-Analysis-Project", blockIndex: 1, imageIndex: 0 },
    ],
  },
};

function ProjectBlock({
  block,
  blockIndex,
  title,
  ctaButtons,
  imageFit,
  defaultAspectRatio,
}: {
  block: Block;
  blockIndex: number;
  title: string;
  ctaButtons: CtaButton[];
  imageFit: "cover" | "contain";
  defaultAspectRatio: string;
}) {
  const aspectRatio = block.aspectRatio ?? defaultAspectRatio;

  return (
    <div className="max-w-5xl mx-auto mb-16">
      <h2 className="text-5xl font-serif mb-8">{title}</h2>
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="bg-white/70 rounded-lg p-6 space-y-6 self-start">
          {block.sections.map((section) => (
            <div key={section.heading}>
              <h3 className="text-xl font-serif mb-2">{section.heading}</h3>
              <p>{section.body}</p>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          {block.images.map((src, index) => {
            const isOffset = index % 2 === 1;
            const button = ctaButtons.find(
              (b) => b.blockIndex === blockIndex && b.imageIndex === index
            );
            return (
              <div key={src} className={isOffset ? "flex justify-end" : ""}>
                <div className="w-[80%]">
                  <div
                    className="relative w-full overflow-hidden rounded-lg"
                    style={{ aspectRatio }}
                  >
                    <Image
                      src={src}
                      alt={`${title} image ${index + 1}`}
                      fill
                      className={
                        imageFit === "contain" ? "object-contain" : "object-cover"
                      }
                    />
                  </div>
                  {button && (
                    <a
                      href={button.url}
                      target={button.url.startsWith("http") ? "_blank" : undefined}
                      rel={button.url.startsWith("http") ? "noreferrer" : undefined}
                      className="mt-3 inline-block border border-black rounded-full px-4 py-1 text-sm"
                    >
                      {button.label}
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectsData[slug];

  if (!project) {
    notFound();
  }

  return (
    <main
      className="min-h-screen px-6 py-16"
      style={{
        background: `linear-gradient(135deg, ${gradientLight}, ${gradientMid})`,
      }}
    >
      <div className="mx-auto max-w-6xl">
        {project.blocks.map((block, index) => (
          <ProjectBlock
            key={index}
            block={block}
            blockIndex={index}
            title={project.title}
            ctaButtons={project.ctaButtons}
            imageFit={project.imageFit ?? "cover"}
            defaultAspectRatio={project.aspectRatio ?? "3/2"}
          />
        ))}
      </div>
    </main>
  );
}