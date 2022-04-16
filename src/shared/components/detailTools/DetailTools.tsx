import {
  Box,
  Button,
  Divider,
  Icon,
  Paper,
  Skeleton,
  Theme,
  Typography,
  useMediaQuery,
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
  newTextButton = 'New',
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
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const theme = useTheme();

  return (
    <Box
      height={theme.spacing(12)}
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
          startIcon={<Icon sx={{ ml: 1 }}>save</Icon>}
        >
          {!smDown && !mdDown && (
            <Typography
              variant="button"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              overflow="hidden"
            >
              Save
            </Typography>
          )}
        </Button>
      )}

      {showLoadingSaveButton && <Skeleton width={110} height={60} />}

      {showSaveCloseButton &&
        !showLoadingSaveCloseButton &&
        !smDown &&
        !mdDown && (
          <Button
            color="primary"
            disableElevation
            variant="outlined"
            onClick={onClickSaveClose}
            startIcon={<Icon>fact_check</Icon>}
          >
            <Typography
              variant="button"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              overflow="hidden"
            >
              Registrations
            </Typography>
          </Button>
        )}

      {showLoadingSaveCloseButton && !smDown && !mdDown && (
        <Skeleton width={180} height={60} />
      )}

      {showDeleteButton && !showLoadingDeleteButton && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          onClick={onClickDelete}
          startIcon={<Icon sx={{ ml: 1 }}>delete</Icon>}
        >
          {!smDown && !mdDown && (
            <Typography
              variant="button"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              overflow="hidden"
            >
              Delete
            </Typography>
          )}
        </Button>
      )}

      {showLoadingDeleteButton && <Skeleton width={110} height={60} />}

      {showNewButton && !showLoadingNewButton && !smDown && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          onClick={onClickNew}
          startIcon={<Icon sx={{ ml: 1 }}>add</Icon>}
        >
          {!smDown && !mdDown && (
            <Typography
              variant="button"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              overflow="hidden"
            >
              {newTextButton}
            </Typography>
          )}
        </Button>
      )}

      {showLoadingNewButton && !smDown && <Skeleton width={110} height={60} />}

      {(showBackButton && showNewButton) ||
        showDeleteButton ||
        showSaveButton ||
        (showSaveCloseButton && (
          <Divider variant="middle" orientation="vertical" sx={{ mx: 2 }} />
        ))}

      {showBackButton && !showLoadingBackButton && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          onClick={onClickBack}
          startIcon={<Icon>keyboard_backspace</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Back
          </Typography>
        </Button>
      )}

      {showLoadingBackButton && <Skeleton width={110} height={60} />}
    </Box>
  );
};
