"use client";
import React, { useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'motion/react';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

interface CountUpProps {
  to: number;
  from?: number;
  delay?: number;
  duration?: number;
  className?: string;
  suffix?: string;
}

const SocialCounter: React.FC = () => {
  const stats: StatItem[] = [
    { value: 11.89, suffix: 'M', label: 'Total Reach' },
    { value: 741.2, suffix: 'K', label: 'Followers' },
    { value: 10.68, suffix: 'M', label: 'Video Views' },
    { value: 319.0, suffix: 'K', label: 'Engagement' },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 uppercase">
          Social Media Performance
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-blue-700 mb-2">
                <CountUp
                  to={stat.value}
                  delay={index * 0.2}
                  duration={2}
                  className="inline"
                  suffix={stat.suffix}
                />
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CountUp: React.FC<CountUpProps> = ({
  to,
  from = 0,
  delay = 0,
  duration = 2,
  className = '',
  suffix = ''
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(from);
  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);
  const springValue = useSpring(motionValue, {
    damping,
    stiffness
  });
  const isInView = useInView(ref, { once: true, margin: '0px' });

  const getDecimalPlaces = (num: number): number => {
    const str = num.toString();
    if (str.includes('.')) {
      const decimals = str.split('.')[1];
      if (parseInt(decimals) !== 0) {
        return decimals.length;
      }
    }
    return 0;
  };

  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

  React.useEffect(() => {
    if (ref.current) {
      ref.current.textContent = String(from);
    }
  }, [from, to]);

  React.useEffect(() => {
    if (isInView) {
      const timeoutId = setTimeout(() => {
        motionValue.set(to);
      }, delay * 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [isInView, motionValue, to, delay]);

  React.useEffect(() => {
    const unsubscribe = springValue.on('change', (latest: number) => {
      if (ref.current) {
        const hasDecimals = maxDecimals > 0;
        const options: Intl.NumberFormatOptions = {
          useGrouping: false,
          minimumFractionDigits: hasDecimals ? maxDecimals : 0,
          maximumFractionDigits: hasDecimals ? maxDecimals : 0
        };
        const formattedNumber = Intl.NumberFormat('en-US', options).format(latest);
        ref.current.textContent = `${formattedNumber}${suffix}`;
      }
    });
    return () => unsubscribe();
  }, [springValue, suffix, maxDecimals]);

  return <span className={className} ref={ref} />;
};

export default SocialCounter;