export const FormComponent = {
    template: `<div class="font-sans">
    <div class="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 ">
        <div class="relative sm:max-w-sm w-full">
            <div class="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
            <div class="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
            <div class="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
                <label for="" class="block text-sm text-gray-700 text-center font-semibold">
                    <h1>{{tituloPagina}}</h1>
                </label>
                <div class="mt-10">
                                  
                    <!-- campos -->
                    <div v-show="this.tituloAcao != 'Cadastrar'">
                        <input type="text" readonly v-model="livro.id"  placeholder="ID" class="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0">
                    </div>
                    
                    <div>
                        <input type="text" v-model="livro.nome"  placeholder="Livro" class="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0">
                    </div>
        
                    <div class="mt-7" v-show="this.tituloAcao != 'Visualizar'" >
                        <button v-on:click="apiComunicacao(methods)" class="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                            {{this.tituloAcao}}
                        </button>
                    </div>
                    <div class="mt-7">
                        <button @click="cancelar" class="bg-red-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`,
    data() {
      return {
        tituloPagina: '',
        tituloAcao: '',
        method: '',
        livro: {
                id: '',
                nome: ''
            }
      }
    },
    created: function() {
        if (this.$route.name == 'Visual') {
            this.tituloPagina = 'Visualizar um Livro';
            this.tituloAcao= 'Visualizar';
            this.visualizar(this.$route.params.id);
        } else if (this.$route.name == 'Editar') {
            this.tituloPagina = 'Editar um Livro';
            this.tituloAcao = 'Editar';
            this.visualizar(this.$route.params.id);
        } else if (this.$route.name == 'Excluir') {
            this.tituloPagina = 'Excluir um Livro';
            this.tituloAcao = 'Excluir';
            this.excluir(this.$route.params.id);
        }else if (this.$route.name = 'Criar') {
            this.tituloPagina = 'Cadastrar um Livro'
            this.tituloAcao= 'Cadastrar';
            this.criar
        }
    },
    methods: {
        cancelar() {
            this.$router.push('/livro');
        },
        apiComunicacao(method) {
            if (this.$route.name == 'Editar') {
                this.editar()
            } else if (this.$route.name == 'Excluir') {
                this.excluir()
            } else if (this.$route.name == 'Visual') {
                this.visualizar(this.$router.params.id)
            } else if (this.$route.name == 'Criar'){
                this.criar()
            }            
        },
        criar(){
            fetch(`http://127.0.0.1:8080/livro/`, {
                method: 'POST',
                body: JSON.stringify(this.livro),
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
            })
                .then(response => 
                    response.json().then((data) => {
                        this.livro.id = data.id
                        this.livro.nome = data.nome
                        this.$router.push('/livro')
            }))
        },
        visualizar(id) {
            fetch(`http://localhost:8080/livro/${id}`)
            .then(response =>     
                response.json().then((data) => {
                    this.livro.id = data.id
                    this.livro.nome = data.nome
            }))
        },
        editar() {            
            fetch(`http://127.0.0.1:8080/livro`, {
                method: 'PUT',
                body: JSON.stringify(this.livro),
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
            })
            .then(response => response.json().then((data) => {
                this.livro.id = data.id
                this.livro.nome = data.nome
                this.$router.push('/livro')
            }))
        },
        excluir(id) {
            fetch(`http://127.0.0.1:8080/livro/${id}`, {
                method: 'DELETE',
                body: JSON.stringify(this.livro),
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
            })
                .then((response) => {
                    if (response.status == 200) {
                        this.$router.push('/livro')
                    }
                })
        }
    }
}