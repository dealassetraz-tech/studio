import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const getPlaceholderImage = (id: string) => {
  return PlaceHolderImages.find(p => p.id === id);
}

const titleRegImage = getPlaceholderImage('feature-title-reg-icon');
const oneSourceImage = getPlaceholderImage('feature-one-source');
const priceHistoryImage = getPlaceholderImage('feature-price-history-icon');
const priceHistoryChartImage = getPlaceholderImage('feature-price-history-chart');
const companyOwnershipImage = getPlaceholderImage('feature-company-ownership-icon');
const companyOwnershipDataImage = getPlaceholderImage('feature-company-ownership-data');


export function Features() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold">
          What ASSETRAZ UK can verify
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          A single source of truth for property and ownership information, designed for professional workflows.
        </p>
      </div>

      <div className="space-y-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="pr-8">
            {titleRegImage && (
              <Image 
                src={titleRegImage.imageUrl} 
                alt={titleRegImage.description}
                width={64}
                height={64}
                className="mb-4"
                data-ai-hint={titleRegImage.imageHint}
              />
            )}
            <h2 className="text-3xl font-bold mb-4">Title & registration</h2>
            <p className="text-muted-foreground mb-4">
              Retrieve the official title information for a UK property and present it in a clean, standard layout.
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Title number & registration date</li>
              <li>Proprietor names & addresses</li>
              <li>Tenure (freehold/leasehold)</li>
            </ul>
          </div>
          <Card className="bg-secondary/30">
            <CardContent className="p-12 flex flex-col items-center justify-center text-center h-full">
              {oneSourceImage && (
                 <Image 
                  src={oneSourceImage.imageUrl}
                  alt={oneSourceImage.description}
                  width={128}
                  height={128}
                  className="mb-4"
                  data-ai-hint={oneSourceImage.imageHint}
                />
              )}
              <h3 className="text-xl font-semibold">One source of truth</h3>
              <p className="text-muted-foreground mt-2">Reduce errors from manual re-keying.</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
            <Card className="bg-secondary/30">
                <CardContent className="p-12 flex flex-col items-center justify-center text-center h-full">
                {priceHistoryChartImage && (
                    <Image 
                        src={priceHistoryChartImage.imageUrl}
                        alt={priceHistoryChartImage.description}
                        width={128}
                        height={128}
                        className="mb-4"
                        data-ai-hint={priceHistoryChartImage.imageHint}
                    />
                )}
                <h3 className="text-xl font-semibold">Clean, readable data</h3>
                <p className="text-muted-foreground mt-2">No more messy PDFs or raw data feeds.</p>
                </CardContent>
            </Card>
            <div className="pl-8">
                {priceHistoryImage && (
                <Image 
                    src={priceHistoryImage.imageUrl} 
                    alt={priceHistoryImage.description}
                    width={64}
                    height={64}
                    className="mb-4"
                    data-ai-hint={priceHistoryImage.imageHint}
                />
                )}
                <h2 className="text-3xl font-bold mb-4">Price paid history</h2>
                <p className="text-muted-foreground mb-4">
                Access historical transaction data and basic analytics so your teams can spot trends and risks.
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Last sale date & price</li>
                <li>Full transaction history</li>
                <li>Average prices in the area</li>
                </ul>
            </div>
        </div>

         <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="pr-8">
            {companyOwnershipImage && (
              <Image 
                src={companyOwnershipImage.imageUrl} 
                alt={companyOwnershipImage.description}
                width={64}
                height={64}
                className="mb-4"
                data-ai-hint={companyOwnershipImage.imageHint}
              />
            )}
            <h2 className="text-3xl font-bold mb-4">Company ownership</h2>
            <p className="text-muted-foreground mb-4">
              If a property is owned by a UK company, we'll fetch the details from Companies House.
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Company name & number</li>
              <li>Director & Persons of Significant Control</li>
              <li>Registered office address</li>
            </ul>
          </div>
          <Card className="bg-secondary/30">
            <CardContent className="p-12 flex flex-col items-center justify-center text-center h-full">
              {companyOwnershipDataImage && (
                 <Image 
                  src={companyOwnershipDataImage.imageUrl}
                  alt={companyOwnershipDataImage.description}
                  width={128}
                  height={128}
                  className="mb-4"
                  data-ai-hint={companyOwnershipDataImage.imageHint}
                />
              )}
              <h3 className="text-xl font-semibold">Connected data sources</h3>
              <p className="text-muted-foreground mt-2">HMLR, Companies House and more in one API.</p>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
