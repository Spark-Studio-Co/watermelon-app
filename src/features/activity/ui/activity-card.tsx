import { Button } from '@/src/shared/ui/button/button'
import Text from '@/src/shared/ui/text/text'


type ActivityType = 'marker_created' | "Friends";

interface IActivityCardProps {
    type: ActivityType
    created: string
    username: string
    description: string
    onPress?: () => void
}

export const ActivityCard = ({ type, created, username, description, onPress }: IActivityCardProps) => {
    return (
        <Button className={`border-[1px] bg-[#262A34] rounded-[8px] pl-2 pr-2.5 pb-3.5 pt-1.5 flex flex-col ${type === 'marker_created' ? 'border-[#00A281]' : 'border-[#FFFF00]'}`} onPress={onPress}>
            <Text weight="regular" className="text-[#BBB5B5] text-[8px]">{created}</Text>
            <Text weight="regular" className="text-white text-[15px] mt-1.5">{username}</Text>
            <Text weight="regular" className="text-white text-[12px] mt-1">{description}</Text>
        </Button>
    )
}
