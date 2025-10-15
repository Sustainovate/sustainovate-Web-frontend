import { Heart, Recycle, Zap, Trees, Leaf, ArrowRight } from 'lucide-react';

export default function Domain() {
  const domains = [
    {
      icon: Heart,
      title: 'Mental Health & Well-being',
      description: 'Nurture your mind while caring for the planet. Find peace in sustainable living.',
      color: 'from-rose-100 to-pink-100',
      iconColor: 'text-rose-600',
      bgGlow: 'bg-rose-200/30',
      image: 'https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: Recycle,
      title: 'Waste Management',
      description: 'Transform waste into wonder. Learn creative ways to reduce, reuse, and recycle.',
      color: 'from-emerald-100 to-teal-100',
      iconColor: 'text-emerald-600',
      bgGlow: 'bg-emerald-200/30',
      image: 'https://images.pexels.com/photos/3850512/pexels-photo-3850512.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: Zap,
      title: 'Carbon & Energy Efficiency',
      description: 'Power a brighter tomorrow. Discover smart ways to reduce your carbon footprint.',
      color: 'from-amber-100 to-yellow-100',
      iconColor: 'text-amber-600',
      bgGlow: 'bg-amber-200/30',
      image: 'https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: Trees,
      title: 'Ecology & Resource Management',
      description: 'Balance and harmony with nature. Manage resources mindfully for future generations.',
      color: 'from-green-100 to-lime-100',
      iconColor: 'text-green-600',
      bgGlow: 'bg-green-200/30',
      image: 'https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: Leaf,
      title: 'Nature & Biodiversity',
      description: 'Celebrate life in all its forms. Protect and preserve the beautiful diversity around us.',
      color: 'from-teal-100 to-cyan-100',
      iconColor: 'text-teal-600',
      bgGlow: 'bg-teal-200/30',
      image: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ];

  return (
    <section className="relative z-10 container mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
          Our Flourishing Domains
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore the diverse ways we re making a positive impact on our planet and well-being
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {domains.map((domain, index) => {
          const Icon = domain.icon;
          return (
            <div
              key={index}
              className="group relative bg-white/60 backdrop-blur-sm rounded-3xl overflow-hidden hover:bg-white transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-green-100/50"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={domain.image}
                  alt={domain.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${domain.color} opacity-40`}></div>
                <div className={`absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg`}>
                  <Icon className={`w-6 h-6 ${domain.iconColor}`} />
                </div>
              </div>

              {/* Content Section */}
              <div className="relative p-6">
                <div className={`absolute inset-0 ${domain.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl`}></div>

                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 leading-snug">
                    {domain.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed mb-4">
                    {domain.description}
                  </p>

                  <button className="text-green-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                    Explore
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>)
}