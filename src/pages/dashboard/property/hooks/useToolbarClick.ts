import { useNavigate } from 'react-router-dom'
import { GridRowSelectionModel } from '@mui/x-data-grid'

export const useToolbarClick = (selectionModel: GridRowSelectionModel) => {
  const navigate = useNavigate()
  return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    switch (e.currentTarget.name) {
      case 'create':
        navigate('new')
        break
      case 'edit':
        navigate(`edit/${selectionModel[0]}`)
        break
      case 'delete':
        navigate(`delete/${selectionModel.join('_')}`)
        break
      default:
        break
    }
  }
}
