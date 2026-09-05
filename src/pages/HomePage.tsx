import React from 'react';
import { Hero } from '../components/Hero';
import { SignatureStrip } from '../components/SignatureStrip';
import { FoundersPicks } from '../components/FoundersPicks';
import { WhyGoldNGlow } from '../components/WhyGoldNGlow';
import { StorySection } from '../components/StorySection';
import { ExperienceSection } from '../components/ExperienceSection';
import { Testimonials } from '../components/Testimonials';
import { JournalSection } from '../components/JournalSection';
import { SignatureCollections } from '../components/SignatureCollections';
import { FinalCTA } from '../components/FinalCTA';
import {
  HeroContent,
  CollectionItem,
  FounderContent,
  FounderPick,
  WhyUsItem,
  ExperienceContent,
  TestimonialItem,
  JournalPost,
  SiteSettings,
} from '../lib/database.types';

interface HomePageProps {
  hero: HeroContent;
  collections: CollectionItem[];
  founder: FounderContent;
  founderPicks: FounderPick[];
  whyUsItems: WhyUsItem[];
  experience: ExperienceContent;
  testimonials: TestimonialItem[];
  journalPosts: JournalPost[];
  settings: SiteSettings;
  onOpenCatalogue: () => void;
  onOpenStoreModal: () => void;
  onOpenAboutModal: () => void;
  onOpenPost: (post: JournalPost) => void;
  onSelectCollection: (item: CollectionItem) => void;
  onSelectFounderPick?: (pick: FounderPick) => void;
  onNavigate?: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  hero,
  collections,
  founder,
  founderPicks,
  whyUsItems,
  experience,
  testimonials,
  journalPosts,
  settings,
  onOpenCatalogue,
  onOpenStoreModal,
  onOpenAboutModal,
  onOpenPost,
  onSelectCollection,
  onSelectFounderPick,
  onNavigate,
}) => {
  return (
    <div className="w-full flex flex-col">
      {/* 1. Hero Section */}
      <Hero
        content={hero}
        onOpenAboutModal={onOpenAboutModal}
        onOpenCatalogue={onOpenCatalogue}
        onNavigate={onNavigate}
      />

      {/* 2. Signature Collections (Split-Screen Cards + Video) */}
      <SignatureStrip
        collections={collections}
        onSelectCollection={onSelectCollection}
        onNavigate={onNavigate}
      />

      {/* 3. Founder's Top Picks */}
      <FoundersPicks
        picks={founderPicks}
        onSelectPick={(pick) => {
          if (onSelectFounderPick) {
            onSelectFounderPick(pick);
          } else {
            const match = collections.find((c) => c.title === pick.title);
            if (match) onSelectCollection(match);
          }
        }}
        onNavigate={onNavigate}
        whatsapp={settings.whatsapp}
      />

      {/* 4. Why Gold N Glow */}
      <WhyGoldNGlow items={whyUsItems} />

      {/* 5. Brand Story / Our Journey */}
      <StorySection
        content={founder}
        onOpenAboutModal={onOpenAboutModal}
      />

      {/* 6. Showroom Experience */}
      <ExperienceSection
        content={experience}
        settings={settings}
        onOpenStoreModal={onOpenStoreModal}
      />

      {/* 7. The Bangle Journal & Guides */}
      <JournalSection
        posts={journalPosts}
        onOpenPost={onOpenPost}
      />

      {/* 8. Full Collections Catalogue Showcase */}
      <SignatureCollections
        collections={collections}
        onSelectCollection={onSelectCollection}
        onOpenCatalogue={onOpenCatalogue}
        onNavigate={onNavigate}
        whatsapp={settings.whatsapp}
      />

      {/* 9. Customer Testimonials (Directly above Final CTA) */}
      <Testimonials testimonials={testimonials} />

      {/* 10. Your Perfect Pair Awaits (Final CTA) */}
      <FinalCTA
        settings={settings}
        onOpenCatalogue={onOpenCatalogue}
        onOpenStoreModal={onOpenStoreModal}
      />
    </div>
  );
};
