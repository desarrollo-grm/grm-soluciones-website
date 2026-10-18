import BenefitCard from '@/src/components/commons/BenefitCard';
import SectionHeader from '@/src/components/commons/SectionHeader';

const SoftwareAdministrativo = () => {
  const modules = [
    {
      icon: '/assets/icons/arithmetic.svg',
      title: 'Saint Annual Administrativo',
      description: 'Control total del ciclo comercial de la empresa: compras, ventas, inventario multialmacén, cuentas por cobrar y por pagar, presupuestos, facturación y generación de libros fiscales (IVA e ISLR) adaptados a las exigencias normativas vigentes.',
    },
    {
      icon: '/assets/icons/data.svg',
      title: 'Saint Annual Contabilidad (Multiempresa)',
      description: 'Sistema de gestión contable flexible y robusto. Permite el manejo de múltiples empresas, comprobantes diarios, asientos contables automáticos integrados con el módulo administrativo, balance general, estado de resultados, mayor analítico y consolidación de estados financieros.',
    },
    {
      icon: '/assets/icons/bank.svg',
      title: 'Saint Annual Nómina / Gestión de Pago (Multiempresa)',
      description: 'Solución integral para la administración y control de gestión humana en múltiples empresas. Procesa nóminas semanales, quincenales o mensuales, cálculo de vacaciones, prestaciones sociales, utilidades, liquidaciones y generación de reportes y archivos de pago para entidades bancarias e instituciones oficiales.',
    },
    {
      icon: '/assets/icons/condominio.svg',
      title: 'Saint Condominio Sagués (Homologado SENIAT)',
      description: 'Aplicación especializada e integrada para la administración integral de inmuebles, edificios y condominios, con emisión de avisos de cobro, conciliación bancaria y cumplimiento fiscal.',
    },
  ];

  return (
    <section className="py-16 px-6 bg-light">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Software Administrativo y de Gestión"
          subtitle="Saint Annual"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
          {modules.map((module, index) => (
            <BenefitCard
              key={index}
              icon={module.icon}
              title={module.title}
              description={module.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SoftwareAdministrativo;
