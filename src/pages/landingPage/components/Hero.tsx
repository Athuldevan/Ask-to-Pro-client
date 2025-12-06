import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, DollarSign, Shield, Users } from "lucide-react";
import Hero from "../../../assets/Heroimage.jpg";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { Card, CardContent } from "@/components/ui/card";

export default function HeroShadcnMinimal() {
  return (
    <>
    <section className="py-28 bg-background">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
        {/* TEXT BLOCK */}
        <div className="flex-1 space-y-8">
          <TypographyH1>
            Become a <span className="text-fuchsia-600">Mentor</span>
          </TypographyH1>

          <p className="text-lg text-muted-foreground max-w-xl">
            Share your experience, earn income, and guide the next generation of
            aspiring talent.
          </p>

          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex gap-3 items-start">
              <Calendar className="text-primary h-6 w-6" />
              <div>
                <h3 className="font-semibold text-foreground">
                  Flexible Scheduling
                </h3>
                <p className="text-muted-foreground text-sm">
                  Set and manage your own availability.
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <DollarSign className="text-primary h-6 w-6" />
              <div>
                <h3 className="font-semibold text-foreground">Earn Income</h3>
                <p className="text-muted-foreground text-sm">
                  Get compensated securely and instantly.
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <Users className="text-primary h-6 w-6" />
              <div>
                <h3 className="font-semibold text-foreground">
                  Build Your Legacy
                </h3>
                <p className="text-muted-foreground text-sm">
                  Inspire learners and create an impact.
                </p>
              </div>
            </div>
          </div>

          <Button variant="default" className="mt-6 px-8 py-4 text-lg rounded-xl">
            Join as Mentor →
          </Button>
        </div>

        {/* IMAGE BLOCK */}
        <div className="flex-1 flex justify-center">
          <img
            src={Hero}
            className="rounded-xl shadow-2xl max-w-lg"
            alt="Mentor Image"
          />
        </div>
      </div>
    </section>

     <section className="container mx-auto px-4 py-20">

      {/* Heading */}
      <TypographyH1 className="text-center mb-12">
        Why Choose <span className="text-fuchsia-600 dark:text-fuchsia-400">MentorConnect?</span>
      </TypographyH1>

      {/* Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Card 1 */}
        <Card className="bg-card border">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-fuchsia-100 dark:bg-fuchsia-950 rounded-lg flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-fuchsia-600 dark:text-fuchsia-400" />
            </div>

            <h3 className="font-bold text-foreground mb-2">
              Book a Session
            </h3>

            <TypographyP>
              Schedule one-on-one sessions with mentors at your convenience.
              Enjoy an easy booking experience with calendar integration.
            </TypographyP>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card className="bg-card border">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>

            <h3 className="font-bold text-foreground mb-2">
              Verified Mentors
            </h3>

            <TypographyP>
              Every mentor is a verified industry professional with years of 
              experience. Learn from people who have mastered their craft.
            </TypographyP>
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card className="bg-card border">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-fuchsia-100 dark:bg-fuchsia-950 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-fuchsia-600 dark:text-fuchsia-400" />
            </div>

            <h3 className="font-bold text-foreground mb-2">
              Personalized Learning
            </h3>

            <TypographyP>
              Receive tailored guidance based on your goals and experience 
              level. Every mentoring session is customized for you.
            </TypographyP>
          </CardContent>
        </Card>

      </div>
    </section>
    </>
  );
}
