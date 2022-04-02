import { BaseLayoutOfPages } from '../../shared/layouts';
import { DetailTools } from '../../shared/components';

export const Dashboard = () => {
  return (
    <BaseLayoutOfPages
      title="Magno - Home"
      toolbar={
        <DetailTools showNewButton showSaveCloseButton showBackButton={false} />
      }
    ></BaseLayoutOfPages>
  );
};
