import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">About ASSETRAZ UK</h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
          ASSETRAZ UK is a property data and verification layer focused on making UK property information accessible, reliable and actionable.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="shadow-lg text-left">
            <CardHeader>
                <CardTitle>Our mission</CardTitle>
            </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To reduce friction and risk in UK property transactions by giving professionals instant, standardised access to the data they need to make decisions and protect their clients.
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-lg text-left">
             <CardHeader>
                <CardTitle>Who we serve</CardTitle>
            </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Estate agents, online marketplaces, conveyancers, lenders and proptech platforms that want to embed property and owner verification earlier in the journey.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
