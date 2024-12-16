import { HeroSection } from "./HeroSection";
import { FeatureSection } from "./FeatureSection";
import { HowItWorks } from "./HowItWorks";
import { Stats } from "./Stats";
import { useSelector } from "react-redux";
import { RootState } from "../../contexts/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function HomePage() {
  const { isConnected } = useSelector((state: RootState) => state.contract);
  const navigate = useNavigate();
  useEffect(() => {
    if (isConnected) {
      navigate("/dashboard");
    }
  }, [isConnected]);
  return (
    <div className="space-y-20 pb-20">
      <HeroSection />
      <Stats />
      <FeatureSection />
      <HowItWorks />
    </div>
  );
}
