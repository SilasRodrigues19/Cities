import { BaseLayoutOfPages } from '../../shared/layouts';
import { Toolbar } from '../../shared/components';

export const Dashboard = () => {
  return (
    <BaseLayoutOfPages
      title="Página inicial"
      toolbar={<Toolbar showInputSearch />}
    >
      Testando
    </BaseLayoutOfPages>
  );
};
