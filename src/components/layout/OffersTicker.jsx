import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchActiveOffers } from '../../store/slices/offersSlice';
import { Megaphone } from 'lucide-react';

const OffersTicker = () => {
  const dispatch = useAppDispatch();
  const { active } = useAppSelector((s) => s.offers);

  useEffect(() => {
    dispatch(fetchActiveOffers());
  }, [dispatch]);

  if (!active || active.length === 0) return null;

  return (
    <div className="relative w-full bg-blue-600 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center py-2 space-x-2">
          <Megaphone className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          <div className="whitespace-nowrap overflow-hidden">
            <div className="animate-[ticker_20s_linear_infinite] flex space-x-8">
              {active.concat(active).map((o, idx) => (
                <a key={(o._id || idx) + '-' + idx} href={o.link || '#'} className="text-xs sm:text-sm hover:underline">
                  {o.badgeText ? `[${o.badgeText}] ` : ''}{o.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
    </div>
  );
};

export default OffersTicker;


