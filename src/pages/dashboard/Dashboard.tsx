import { BaseLayoutOfPages } from '../../shared/layouts';
import { ListingTools } from '../../shared/components';

export const Dashboard = () => {
  return (
    <BaseLayoutOfPages
      title="Página inicial"
      toolbar={<ListingTools showInputSearch />}
    >
      Testando
    </BaseLayoutOfPages>
  );
};
