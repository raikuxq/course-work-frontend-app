import {useQuery, provideApolloClient} from "@vue/apollo-composable";
import {USER_CURRENT} from "@/common/api/UserCurrent";
import {useAuthStore} from "@/modules/auth/store/authStore";
import { client as apolloClient } from "@/app/apollo";


export const useFetchUserCurrent = async () => {
    try {
        const authStore = useAuthStore()
        provideApolloClient(apolloClient)
        const {result, loading, error, onResult} = await useQuery(USER_CURRENT);

        onResult(() => {
            if (result.value?.userCurrent) {
                authStore.setUser(result.value.userCurrent)
            }
        })

        return {
            result,
            loading,
            error
        }
    } catch (e) {
        console.log(e)
    }
}
