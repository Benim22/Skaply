import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Shield, Lock, Eye, FileText, Mail, Clock, UserCheck, Settings, HelpCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Integritetspolicy | Skaply",
  description: "Information om hur Skaply hanterar och skyddar dina personuppgifter.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="bg-[#00ADB5]/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Shield className="h-8 w-8 text-[#00ADB5]" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Integritetspolicy</h1>
            <p className="text-foreground/70 text-lg max-w-3xl mx-auto">
              Vi värnar om din integritet. Denna policy beskriver hur vi samlar in, använder och skyddar dina personuppgifter.
            </p>
          </div>

          <div className="mb-10 bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border/50">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">Sammanfattning</h2>
                <p className="text-foreground/70">
                  Vi förstår att det kan vara jobbigt att läsa långa policydokument. Här är en enkel sammanfattning.
                </p>
              </div>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-start space-x-3">
                  <div className="bg-[#00ADB5]/10 p-2 rounded-md flex-shrink-0">
                    <Lock className="h-5 w-5 text-[#00ADB5]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Vi skyddar dina uppgifter</p>
                    <p className="text-xs text-foreground/70">Med robust säkerhet och kryptering</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-[#00ADB5]/10 p-2 rounded-md flex-shrink-0">
                    <Eye className="h-5 w-5 text-[#00ADB5]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Transparent användning</p>
                    <p className="text-xs text-foreground/70">Vi är tydliga med hur vi använder data</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-[#00ADB5]/10 p-2 rounded-md flex-shrink-0">
                    <UserCheck className="h-5 w-5 text-[#00ADB5]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Dina rättigheter</p>
                    <p className="text-xs text-foreground/70">Du har kontroll över dina data</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-[#00ADB5]/10 p-2 rounded-md flex-shrink-0">
                    <Settings className="h-5 w-5 text-[#00ADB5]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Enkla val</p>
                    <p className="text-xs text-foreground/70">Du kan enkelt ändra dina inställningar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="vilka-uppgifter" className="mb-12">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
              <TabsTrigger value="vilka-uppgifter">Vilka uppgifter</TabsTrigger>
              <TabsTrigger value="hur-anvands">Hur de används</TabsTrigger>
              <TabsTrigger value="delning">Delning</TabsTrigger>
              <TabsTrigger value="dina-rattigheter">Dina rättigheter</TabsTrigger>
              <TabsTrigger value="kontakt">Kontakta oss</TabsTrigger>
            </TabsList>
            
            <TabsContent value="vilka-uppgifter" className="space-y-6">
              <Card className="p-6 bg-card/50 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-[#00ADB5]" />
                  Vilka uppgifter vi samlar in
                </h3>
                <div className="space-y-4">
                  <div className="bg-background/80 p-4 rounded-lg border border-border/20">
                    <h4 className="font-medium mb-2">När du kontaktar oss</h4>
                    <ul className="list-disc list-inside text-foreground/70 space-y-1">
                      <li>Namn</li>
                      <li>E-postadress</li>
                      <li>Telefonnummer (frivilligt)</li>
                      <li>Företagsnamn (om tillämpligt)</li>
                      <li>Information om ditt projekt</li>
                    </ul>
                  </div>
                  
                  <div className="bg-background/80 p-4 rounded-lg border border-border/20">
                    <h4 className="font-medium mb-2">När du besöker vår webbplats</h4>
                    <ul className="list-disc list-inside text-foreground/70 space-y-1">
                      <li>IP-adress</li>
                      <li>Webbläsartyp och version</li>
                      <li>Operativsystem</li>
                      <li>Besökta sidor</li>
                      <li>Tidpunkt för besök</li>
                      <li>Referenskällor</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="hur-anvands" className="space-y-6">
              <Card className="p-6 bg-card/50 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-[#00ADB5]" />
                  Hur vi använder dina uppgifter
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-background/80 p-4 rounded-lg border border-border/20">
                      <h4 className="font-medium mb-2">För att tillhandahålla våra tjänster</h4>
                      <p className="text-foreground/70 text-sm">
                        Vi använder dina uppgifter för att:
                      </p>
                      <ul className="list-disc list-inside text-foreground/70 text-sm mt-2 space-y-1">
                        <li>Kontakta dig angående ditt projekt</li>
                        <li>Förbereda och skicka offerter</li>
                        <li>Leverera de tjänster du har beställt</li>
                        <li>Hantera kundrelationen under projektets gång</li>
                      </ul>
                    </div>
                    
                    <div className="bg-background/80 p-4 rounded-lg border border-border/20">
                      <h4 className="font-medium mb-2">För att förbättra våra tjänster</h4>
                      <p className="text-foreground/70 text-sm">
                        Vi använder anonymiserad data för att:
                      </p>
                      <ul className="list-disc list-inside text-foreground/70 text-sm mt-2 space-y-1">
                        <li>Analysera användningen av vår webbplats</li>
                        <li>Identifiera förbättringsområden</li>
                        <li>Utveckla nya tjänster och funktioner</li>
                        <li>Förstå våra kunders behov bättre</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-[#00ADB5]/5 p-4 rounded-lg border border-[#00ADB5]/20">
                    <h4 className="font-medium mb-2 flex items-center">
                      <HelpCircle className="h-5 w-5 mr-2 text-[#00ADB5]" />
                      Viktigt att veta
                    </h4>
                    <ul className="text-foreground/70 text-sm space-y-2">
                      <li>• Vi säljer <strong>aldrig</strong> dina personuppgifter till tredje part</li>
                      <li>• Vi använder endast dina uppgifter till de ändamål som beskrivs i denna policy</li>
                      <li>• Vi sparar dina uppgifter endast så länge som det är nödvändigt</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="delning" className="space-y-6">
              <Card className="p-6 bg-card/50 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <ExternalLink className="h-5 w-5 mr-2 text-[#00ADB5]" />
                  Delning av personuppgifter
                </h3>
                <div className="space-y-4">
                  <p className="text-foreground/70">
                    Vi delar endast dina personuppgifter i följande situationer:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-background/80 p-4 rounded-lg border border-border/20">
                      <h4 className="font-medium mb-2">Tjänsteleverantörer</h4>
                      <p className="text-foreground/70 text-sm">
                        Vi kan dela information med betrodda tredjeparter som hjälper oss att driva vår verksamhet, 
                        till exempel betaltjänster, e-postleverantörer och webbhotell.
                      </p>
                    </div>
                    
                    <div className="bg-background/80 p-4 rounded-lg border border-border/20">
                      <h4 className="font-medium mb-2">Juridiska skäl</h4>
                      <p className="text-foreground/70 text-sm">
                        Vi kan lämna ut personuppgifter om det krävs enligt lag eller för att skydda våra rättigheter, 
                        egendom eller säkerhet.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-background/80 p-4 rounded-lg border border-border/20">
                    <h4 className="font-medium mb-2">Partners och underleverantörer</h4>
                    <p className="text-foreground/70 text-sm">
                      För vissa projekt kan vi behöva dela relevanta uppgifter med partners eller underleverantörer 
                      som hjälper oss att leverera den tjänst du har beställt. I dessa fall säkerställer vi att:
                    </p>
                    <ul className="list-disc list-inside text-foreground/70 text-sm mt-2 space-y-1">
                      <li>De endast får tillgång till information som är nödvändig för att utföra uppgiften</li>
                      <li>De följer samma strikta sekretess- och säkerhetsstandarder som vi gör</li>
                      <li>De inte använder informationen för andra ändamål</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="dina-rattigheter" className="space-y-6">
              <Card className="p-6 bg-card/50 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <UserCheck className="h-5 w-5 mr-2 text-[#00ADB5]" />
                  Dina rättigheter
                </h3>
                <div className="space-y-4">
                  <p className="text-foreground/70">
                    Enligt dataskyddsförordningen (GDPR) har du flera rättigheter gällande dina personuppgifter:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-background/80 p-4 rounded-lg border border-border/20">
                      <h4 className="font-medium mb-2">Rätt till tillgång</h4>
                      <p className="text-foreground/70 text-sm">
                        Du har rätt att få veta vilka personuppgifter vi har om dig och hur vi använder dem.
                      </p>
                    </div>
                    
                    <div className="bg-background/80 p-4 rounded-lg border border-border/20">
                      <h4 className="font-medium mb-2">Rätt till rättelse</h4>
                      <p className="text-foreground/70 text-sm">
                        Du har rätt att få felaktiga personuppgifter om dig korrigerade.
                      </p>
                    </div>
                    
                    <div className="bg-background/80 p-4 rounded-lg border border-border/20">
                      <h4 className="font-medium mb-2">Rätt till radering</h4>
                      <p className="text-foreground/70 text-sm">
                        Du har i vissa fall rätt att få dina personuppgifter raderade.
                      </p>
                    </div>
                    
                    <div className="bg-background/80 p-4 rounded-lg border border-border/20">
                      <h4 className="font-medium mb-2">Rätt till begränsning</h4>
                      <p className="text-foreground/70 text-sm">
                        Du har rätt att begära att vi begränsar behandlingen av dina personuppgifter.
                      </p>
                    </div>
                    
                    <div className="bg-background/80 p-4 rounded-lg border border-border/20">
                      <h4 className="font-medium mb-2">Rätt till dataportabilitet</h4>
                      <p className="text-foreground/70 text-sm">
                        Du har rätt att få ut dina personuppgifter i ett strukturerat format.
                      </p>
                    </div>
                    
                    <div className="bg-background/80 p-4 rounded-lg border border-border/20">
                      <h4 className="font-medium mb-2">Rätt att göra invändningar</h4>
                      <p className="text-foreground/70 text-sm">
                        Du har rätt att invända mot viss behandling av dina personuppgifter.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-[#00ADB5]/5 p-4 rounded-lg border border-[#00ADB5]/20">
                    <h4 className="font-medium mb-2">Hur du utövar dina rättigheter</h4>
                    <p className="text-foreground/70 text-sm">
                      För att utöva någon av dina rättigheter, vänligen kontakta oss via e-post på{" "}
                      <a href="mailto:dataskydd@skaply.se" className="text-[#00ADB5] hover:underline">
                        dataskydd@skaply.se
                      </a>{" "}
                      eller via kontaktformuläret nedan. Vi kommer att besvara din begäran så snart som möjligt, 
                      och senast inom en månad.
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="kontakt" className="space-y-6">
              <Card className="p-6 bg-card/50 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-[#00ADB5]" />
                  Kontakta oss om integritetsfrågor
                </h3>
                <div className="space-y-4">
                  <p className="text-foreground/70">
                    Om du har frågor eller funderingar om vår integritetspolicy eller hur vi hanterar dina personuppgifter, 
                    tveka inte att kontakta oss:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-background/80 p-4 rounded-lg border border-border/20">
                      <h4 className="font-medium mb-2">Via e-post</h4>
                      <p className="text-foreground/70 text-sm">
                        <a href="mailto:dataskydd@skaply.se" className="text-[#00ADB5] hover:underline flex items-center">
                          <Mail className="h-4 w-4 mr-2" />
                          dataskydd@skaply.se
                        </a>
                      </p>
                    </div>
                    
                    <div className="bg-background/80 p-4 rounded-lg border border-border/20">
                      <h4 className="font-medium mb-2">Svarstid</h4>
                      <p className="text-foreground/70 text-sm flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-[#00ADB5]" />
                        Vi svarar normalt inom 48 timmar på vardagar
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-[#00ADB5]/5 p-4 rounded-lg border border-[#00ADB5]/20">
                    <h4 className="font-medium mb-2">Har du klagomål?</h4>
                    <p className="text-foreground/70 text-sm">
                      Om du inte är nöjd med hur vi hanterar dina personuppgifter har du rätt att lämna in ett klagomål 
                      till Integritetsskyddsmyndigheten (IMY), som är tillsynsmyndighet för dataskyddsfrågor i Sverige.
                    </p>
                    <div className="mt-3">
                      <a 
                        href="https://www.imy.se/" 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-[#00ADB5] hover:underline text-sm flex items-center"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Besök Integritetsskyddsmyndigheten
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="bg-foreground/5 rounded-lg p-6 border border-border/20 mb-8">
            <h2 className="text-xl font-semibold mb-4">Uppdateringar av integritetspolicyn</h2>
            <p className="text-foreground/70 mb-4">
              Vi kan komma att uppdatera denna integritetspolicy för att spegla ändringar i vår verksamhet eller 
              för att uppfylla lagkrav. Vi rekommenderar att du regelbundet kontrollerar denna sida för att hålla 
              dig informerad om eventuella ändringar.
            </p>
            <div className="flex items-center border-t border-border/20 pt-4 text-sm">
              <Clock className="h-4 w-4 mr-2 text-[#00ADB5]" />
              <span className="text-foreground/70">Senast uppdaterad: 7 maj 2025</span>
            </div>
          </div>

          <div className="text-center mt-12">
            <h2 className="text-2xl font-bold mb-4">Har du fler frågor?</h2>
            <p className="text-foreground/70 mb-6">
              Vi hjälper dig gärna att förstå hur vi hanterar dina personuppgifter.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                asChild
                variant="outline"
                className="border-[#00ADB5] text-[#00ADB5] hover:bg-[#00ADB5]/10"
              >
                <a href="/kontakt">Kontakta oss</a>
              </Button>
              <Button
                asChild
                className="bg-[#00ADB5] hover:bg-[#00ADB5]/80 text-white"
              >
                <a href="/#faq">Vanliga frågor</a>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 