import { BaseLayoutOfPages } from '../../shared/layouts';
import { DetailTools } from '../../shared/components';

export const Dashboard = () => {
  return (
    <BaseLayoutOfPages title="Página inicial" toolbar={<DetailTools />}>
      Testando
    </BaseLayoutOfPages>
  );
};
