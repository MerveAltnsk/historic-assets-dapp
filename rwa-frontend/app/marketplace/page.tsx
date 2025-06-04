'use client';

import { useState, useEffect } from 'react';
import { useWalletStore } from '@/stores/wallet';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Building2,
  MapPin,
  History,
  Users,
  Filter,
  Search,
  Star,
  Eye,
  ArrowRight,
  Landmark,
  Shield,
  Clock
} from 'lucide-react';
import type { HeritageAsset } from '@/lib/types';
import { formatCurrency, formatPercentage } from '@/lib/stellar';
import Link from 'next/link';

// Heritage marketplace data
const marketplaceAssets: HeritageAsset[] = [
  {
    id: '1',
    name: 'Ottoman Palace Restoration',
    location: 'Istanbul, Turkey',
    type: 'restoration_project',
    description: 'Comprehensive restoration project for a 16th-century Ottoman palace',
    totalValue: '1500000',
    availableTokens: '750000',
    pricePerToken: '2.00',
    projectedYield: '6.5',
    riskLevel: 'medium',
    status: 'live',
    images: ['/api/placeholder/400/300'],
    launchDate: Date.now() - 86400000,
    investors: 32,
    contractId: 'HRTG1AC4EHNMMHEI2W3QU6UQ5N4KSVYRLVTB5M2XMARCNS4CNLWMX3VQ6',
    certification: 'UNESCO World Heritage'
  },
  {
    id: '2',
    name: 'Ancient Theater Collection',
    location: 'Athens, Greece',
    type: 'museum_collection',
    description: 'Exclusive collection of ancient Greek theater artifacts',
    totalValue: '800000',
    availableTokens: '400000',
    pricePerToken: '2.00',
    projectedYield: '5.5',
    riskLevel: 'low',
    status: 'live',
    images: ['/api/placeholder/400/300'],
    launchDate: Date.now() - 172800000,
    investors: 28,
    contractId: 'HRTG2BC4EHNMMHEI2W3QU6UQ5N4KSVYRLVTB5M2XMARCNS4CNLWMX3VQ7',
    certification: 'National Heritage'
  }
];

const assetTypeFilters = [
  { value: 'all', label: 'All Assets' },
  { value: 'restoration_project', label: 'Restoration Projects' },
  { value: 'museum_collection', label: 'Museum Collections' },
  { value: 'historical_building', label: 'Historical Buildings' }
];

const locationFilters = [
  { value: 'all', label: 'All Locations' },
  { value: 'europe', label: 'Europe' },
  { value: 'asia', label: 'Asia' },
  { value: 'americas', label: 'Americas' }
];

const certificationFilters = [
  { value: 'all', label: 'All Certifications' },
  { value: 'unesco', label: 'UNESCO World Heritage' },
  { value: 'national', label: 'National Heritage' },
  { value: 'museum', label: 'Museum Certified' }
];

export default function Marketplace() {
  const { isConnected } = useWalletStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedCertification, setSelectedCertification] = useState<string>('all');

  const filteredAssets = marketplaceAssets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || asset.type === selectedType;
    const matchesLocation = selectedLocation === 'all' || asset.location.toLowerCase().includes(selectedLocation.toLowerCase());
    const matchesCertification = selectedCertification === 'all' || 
                                asset.certification.toLowerCase().includes(selectedCertification.toLowerCase());

    return matchesSearch && matchesType && matchesLocation && matchesCertification;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Marketplace Stats */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Heritage Value</CardTitle>
                <Landmark className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency('2300000')}</div>
                <p className="text-xs text-muted-foreground">Combined value of all heritage assets</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{marketplaceAssets.length}</div>
                <p className="text-xs text-muted-foreground">Live heritage preservation projects</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Investors</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {marketplaceAssets.reduce((sum, asset) => sum + asset.investors, 0)}
                </div>
                <p className="text-xs text-muted-foreground">Heritage preservation supporters</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filter Heritage Assets
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search heritage assets by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  {assetTypeFilters.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>

                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  {locationFilters.map(location => (
                    <option key={location.value} value={location.value}>{location.label}</option>
                  ))}
                </select>

                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={selectedCertification}
                  onChange={(e) => setSelectedCertification(e.target.value)}
                >
                  {certificationFilters.map(cert => (
                    <option key={cert.value} value={cert.value}>{cert.label}</option>
                  ))}
                </select>
              </div>
              {(searchTerm || selectedType !== 'all' || selectedLocation !== 'all' || selectedCertification !== 'all') && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedType('all');
                    setSelectedLocation('all');
                    setSelectedCertification('all');
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Heritage Assets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssets.map((asset) => (
              <Card key={asset.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-video bg-muted relative">
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Badge variant={asset.riskLevel === 'low' ? 'default' : 'secondary'}>
                        {asset.certification}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-sm opacity-90 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {asset.location}
                      </p>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{asset.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{asset.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <p className="text-muted-foreground">Token Price</p>
                        <p className="font-semibold">{formatCurrency(asset.pricePerToken)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Projected Yield</p>
                        <p className="font-semibold">{asset.projectedYield}%</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Progress ({formatPercentage(40)})</span>
                        <span>{(parseInt(asset.availableTokens) / 1000000).toFixed(1)}M tokens left</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{
                            width: `40%`
                          }}
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      {asset.status === 'live' && asset.contractId ? (
                        <Button className="w-full" asChild>
                          <Link href="/transfer">
                            Support Preservation
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Link>
                        </Button>
                      ) : (
                        <Button className="w-full" variant="outline" disabled>
                          <Clock className="h-4 w-4 mr-2" />
                          {asset.status === 'upcoming' ? `Coming Soon` : 'Completed'}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}