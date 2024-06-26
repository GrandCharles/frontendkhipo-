import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { parseCookies } from 'nookies';

// Usuários não logados podem acessar
export function canSSRGuest<P>(fn: GetServerSideProps<P>) {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx);

        if (cookies['@nextAuth.token']) {
            return {
                redirect: {
                    destination: '/dash',
                    permanent: false,
                }
            };
        }

        return await fn(ctx);
    };
}