import { useActiveStore } from "../../model/use-active-store"
import { Button } from "../button/button"

interface ICheckboxProps {
    activeItem: any
    storeKey: string
    onPress?: () => void
}

export const Checkbox = ({ activeItem, storeKey, onPress }: ICheckboxProps) => {
    const { active, setActive } = useActiveStore(storeKey, '')

    return (
        <Button onPress={() => {
            setActive(activeItem)
            onPress?.()
        }} children className={`border border-[#D9D9D9] rounded-[3px] w-[20px] h-[20px] ${active === activeItem && 'bg-[#D9D9D9]'}`} />
    )
}
