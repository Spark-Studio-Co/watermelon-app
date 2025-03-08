import { MainLayout } from "../../layouts/main-layout"
import { Map } from "@/src/features/map/ui/map"

export const MapScreen = () => {

    return (
        <MainLayout isMap>
            <Map />
        </MainLayout>
    )
}
