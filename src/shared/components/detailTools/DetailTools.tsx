import {
  Box,
  Button,
  Divider,
  Icon,
  Paper,
  Skeleton,
  useTheme,
} from '@mui/material';

interface IDetailToolsProps {
  newTextButton?: string;
  showNewButton?: boolean;
  showBackButton?: boolean;
  showDeleteButton?: boolean;
  showSaveButton?: boolean;
  showSaveCloseButton?: boolean;

  showLoadingNewButton?: boolean;
  showLoadingBackButton?: boolean;
  showLoadingDeleteButton?: boolean;
  showLoadingSaveButton?: boolean;
  showLoadingSaveCloseButton?: boolean;

  onClickNew?: () => void;
  onClickBack?: () => void;
  onClickDelete?: () => void;
  onClickSave?: () => void;
  onClickSaveClose?: () => void;
}

export const DetailTools: React.FC<IDetailToolsProps> = ({
  newTextButton = 'Novo',
  showNewButton = true,
  showBackButton = true,
  showDeleteButton = true,
  showSaveButton = true,
  showSaveCloseButton = false,

  showLoadingNewButton = false,
  showLoadingBackButton = false,
  showLoadingDeleteButton = false,
  showLoadingSaveButton = false,
  showLoadingSaveCloseButton = false,

  onClickNew,
  onClickBack,
  onClickDelete,
  onClickSave,
  onClickSaveClose,
}) => {
  const theme = useTheme();

  return (
    <Box
      height={theme.spacing(5)}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      gap={1}
      alignItems="center"
      component={Paper}
    >
      {showSaveButton && !showLoadingSaveButton && (
        <Button
          color="primary"
          disableElevation
          variant="contained"
          onClick={onClickSave}
          startIcon={<Icon>save</Icon>}
        >
          Salvar
        </Button>
      )}

      {showLoadingSaveButton && <Skeleton width={110} height={60} />}

      {showSaveCloseButton && !showLoadingSaveCloseButton && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          onClick={onClickSaveClose}
          startIcon={<Icon>save</Icon>}
        >
          Salvar e voltar
        </Button>
      )}

      {showLoadingSaveCloseButton && <Skeleton width={180} height={60} />}

      {showDeleteButton && !showLoadingDeleteButton && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          onClick={onClickDelete}
          startIcon={<Icon>delete</Icon>}
        >
          Apagar
        </Button>
      )}

      {showLoadingDeleteButton && <Skeleton width={110} height={60} />}

      {showNewButton && !showLoadingNewButton && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          onClick={onClickNew}
          startIcon={<Icon>add</Icon>}
        >
          {newTextButton}
        </Button>
      )}

      {showLoadingNewButton && <Skeleton width={110} height={60} />}

      <Divider variant="middle" orientation="vertical" sx={{ mx: 2 }} />

      {showBackButton && !showLoadingBackButton && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          onClick={onClickBack}
          startIcon={<Icon>arrow_back</Icon>}
        >
          Voltar
        </Button>
      )}

      {showLoadingBackButton && <Skeleton width={110} height={60} />}
    </Box>
  );
};
