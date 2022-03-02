import { Box, Button, Divider, Icon, Paper, useTheme } from '@mui/material';

interface IDetailToolsProps {
  newTextButton?: string;
  showNewButton?: boolean;
  showBackButton?: boolean;
  showDeleteButton?: boolean;
  showSaveButton?: boolean;
  showSaveCloseButton?: boolean;

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
      {showSaveButton && (
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
      {showSaveCloseButton && (
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
      {showDeleteButton && (
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
      {showNewButton && (
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

      <Divider variant="middle" orientation="vertical" sx={{ mx: 2 }} />

      {showBackButton && (
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
    </Box>
  );
};
