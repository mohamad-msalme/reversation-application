import React from 'react'
import { CardActionArea, CardActions, CardActionsProps } from '@mui/material'

type ReservationCardActionProps = React.PropsWithChildren<
  CardActionsProps & {
    actionArea?: boolean
  }
>
export const ReservationCardAction: React.FC<ReservationCardActionProps> = ({
  actionArea,
  children,
  ...cardActionProps
}) => (
  <>
    {actionArea ? (
      <CardActionArea>
        <CardActions sx={{ justifyContent: 'center' }} {...cardActionProps}>
          {children}
        </CardActions>
      </CardActionArea>
    ) : (
      <CardActions sx={{ justifyContent: 'center' }} {...cardActionProps}>
        {children}
      </CardActions>
    )}
  </>
)
