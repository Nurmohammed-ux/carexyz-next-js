import { getSingleService } from "@/action/server/service";
import ServiceDetails from "@/components/layout/ServiceDetails";
import { notFound } from "next/navigation";

const SITE_URL = "https://care-xyz-iota.vercel.app";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const service = await getSingleService(id);

  if (!service) {
    return {
      title: "Service Not Found | Care.xyz",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = service.name;

  const description =
    service.description ||
    `Discover ${title} at Care.xyz. Find trusted caregivers and book reliable caregiving services for your loved ones in Bangladesh.`;

  const image =
    service.image || "https://i.ibb.co.com/twZxM02W/carexyz-service.png";

  return {
    title: `${title}`,
    description: description.slice(0, 160),

    alternates: {
      canonical: `${SITE_URL}/services/${id}`,
    },

    openGraph: {
      type: "website",
      title: `${title} | Care.xyz`,
      description: description.slice(0, 160),
      url: `${SITE_URL}/services/${id}`,
      siteName: "Care.xyz",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${title} - Care.xyz`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${title} | Care.xyz`,
      description: description.slice(0, 160),
      images: [image],
    },
  };
}

const SingleServicePage = async ({ params }) => {
  const { id } = await params;
  const service = await getSingleService(id);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <main className="pt-16 pb-8">
        <ServiceDetails service={service} />
      </main>
    </div>
  );
};

export default SingleServicePage;