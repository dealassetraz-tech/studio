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
      <div className="max-w-6xl mx-auto text-center mt-16 md:mt-24">
        <h2 className="text-3xl md:text-4xl font-bold">Our Core Values</h2>
        <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
          The principles that guide our work and our commitment to the UK property market.
        </p>
        <div className="grid md:grid-cols-3 gap-8 mt-12 text-left">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Data Integrity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We are committed to providing the most accurate and reliable property data by connecting directly to official sources.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Radical Transparency</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We believe in making property information clear and accessible to empower professionals and protect consumers.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Customer-Centric Innovation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We build tools that solve real-world problems, designing our products with the professional workflow at the forefront.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
