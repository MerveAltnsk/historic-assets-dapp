'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';

export default function TokenizePage() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">List Heritage Asset</h1>
            <p className="text-muted-foreground">
              Tokenize your cultural heritage asset for preservation and community support
            </p>
          </div>

          <div className="space-y-6">
            {/* Step 1: Asset Basics */}
            <Card className={step === 1 ? 'block' : 'hidden'}>
              <CardHeader>
                <CardTitle>Asset Basics</CardTitle>
                <CardDescription>Enter the basic information about your heritage asset</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="asset-type">Asset Type</Label>
                  <select
                    id="asset-type"
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                  >
                    <option value="restoration_project">Restoration Project</option>
                    <option value="museum_collection">Museum Collection</option>
                    <option value="historical_building">Historical Building</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="asset-name">Asset Name</Label>
                  <Input id="asset-name" placeholder="e.g. Byzantine Church Restoration" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="asset-location">Location</Label>
                  <Input id="asset-location" placeholder="e.g. Istanbul, Turkey" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="historical-period">Historical Period</Label>
                  <Input id="historical-period" placeholder="e.g. 15th Century Ottoman" />
                </div>
                <Button onClick={() => setStep(2)}>Continue</Button>
              </CardContent>
            </Card>

            {/* Step 2: Heritage Details */}
            <Card className={step === 2 ? 'block' : 'hidden'}>
              <CardHeader>
                <CardTitle>Heritage Details</CardTitle>
                <CardDescription>Provide detailed information about the heritage asset</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="architectural-style">Architectural Style/Category</Label>
                  <Input id="architectural-style" placeholder="e.g. Byzantine Architecture" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="condition">Current Condition</Label>
                  <select
                    id="condition"
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                  >
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="significance">Historical Significance</Label>
                  <Textarea 
                    id="significance"
                    placeholder="Describe the historical and cultural significance of the asset"
                  />
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                  <Button onClick={() => setStep(3)}>Continue</Button>
                </div>
              </CardContent>
            </Card>

            {/* Step 3: Legal & Certification */}
            <Card className={step === 3 ? 'block' : 'hidden'}>
              <CardHeader>
                <CardTitle>Legal & Certification</CardTitle>
                <CardDescription>Upload required documentation and certifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ownership-docs">Ownership Documentation</Label>
                  <Input id="ownership-docs" type="file" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heritage-status">Heritage Status</Label>
                  <select
                    id="heritage-status"
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                  >
                    <option value="unesco">UNESCO World Heritage</option>
                    <option value="national">National Heritage</option>
                    <option value="museum">Museum Certified</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certifications">Additional Certifications</Label>
                  <Input id="certifications" type="file" multiple />
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                  <Button onClick={() => setStep(4)}>Continue</Button>
                </div>
              </CardContent>
            </Card>

            {/* Step 4: Token Economics */}
            <Card className={step === 4 ? 'block' : 'hidden'}>
              <CardHeader>
                <CardTitle>Token Economics</CardTitle>
                <CardDescription>Define the tokenization parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="funding-goal">Funding Goal</Label>
                  <Input id="funding-goal" type="number" placeholder="e.g. 1000000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="token-price">Token Price (USD)</Label>
                  <Input id="token-price" type="number" placeholder="e.g. 10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="token-supply">Total Token Supply</Label>
                  <Input id="token-supply" type="number" placeholder="e.g. 100000" />
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep(3)}>Back</Button>
                  <Button onClick={() => setStep(5)}>Continue</Button>
                </div>
              </CardContent>
            </Card>

            {/* Step 5: Publish Asset */}
            <Card className={step === 5 ? 'block' : 'hidden'}>
              <CardHeader>
                <CardTitle>Publish Asset</CardTitle>
                <CardDescription>Review and publish your heritage asset</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-4 space-y-2">
                  <p className="font-medium">Final Checklist</p>
                  <ul className="list-disc pl-4 space-y-1 text-sm text-muted-foreground">
                    <li>All required documentation is provided</li>
                    <li>Heritage status and certifications are verified</li>
                    <li>Token economics parameters are set</li>
                    <li>Legal compliance requirements are met</li>
                  </ul>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep(4)}>Back</Button>
                  <Button 
                    onClick={() => {
                      // Handle form submission
                      console.log('Submitting form...');
                    }}
                  >
                    Publish Heritage Asset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}