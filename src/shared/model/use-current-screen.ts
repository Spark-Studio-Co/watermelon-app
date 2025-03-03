import { useNavigationState } from '@react-navigation/native';

export const useCurrentScreen = () => {
    return useNavigationState(state => state.routes[state.index].name);
};