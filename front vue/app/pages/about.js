export const AboutComponent = {
    template: `
    <div class="relative min-h-screen flex flex-col sm:justify-center items-center bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 ">   
        <div class="relative sm:max-w-sm w-45">
            <div class="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
            <div class="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
            <div class="relative w-50 rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">   
                <b>Seja bem vindo!</b>
                <h1>Confira nossos livros disponíveis</h1>
                <div class="mt-7">
                    <button @click="$router.push('livro')" class="w-full bg-indigo-900 py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                        Listagem
                    </button>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {

        }
    }
}