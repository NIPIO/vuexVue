Vue.component('hijo', {
	template: `
	<div class='bg-info'>
	<button @click="aumentar">+</button>
	<button @click="restar">-</button>
	<button @click="duplicar(2)">x2</button>
	<p>{{numero}}</p>

		<button @click='obtenerCursos()'>obtenerCursos()</button>
		<p>{{cursos}}</p>
	</div>
	`,
	methods: {
		//USO Vuex.xxxxxx porque no puedo importalo pero en los proyectos seria: ...mapState[], ...mapActions[], ...mapMutations[]
		//los 3 puntos es porque estoy agregando un objeto dentro de otro y no me lo permite javascript, con los 3 puntos sí.
		//esto va a buscar a store las mutations que se llamen asi
		...Vuex.mapMutations(['aumentar', 'restar','duplicar']),
		...Vuex.mapActions(['obtenerCursos'])
	},
	computed: {
		//esto va a buscar a store los state que se llamen asi
		...Vuex.mapState(['numero','cursos']),
	}
})


Vue.component('titulo', {
	template: `
	<div class='bg-danger'>
	<h1>numero {{$store.state.numero}}</h1>
	<hijo></hijo>
	</div>
	`
})

const vuexstore = new Vuex.Store({
	state: {
		numero : 10,
		cursos: []
	},
	mutations: {
		aumentar(state){
			state.numero++
		},
		restar(state){
			state.numero--
		},
		duplicar(state, num){
			state.numero *= num
		},
		llenarCursos(state, cursosAccion) {
			state.cursos = cursosAccion
		}
	},
	actions: {
		//el commit es para mandar a (mutations, dato)
		obtenerCursos: async function({commit}){
			//async porque voy a esperar (await) que la url(fecth) citada me deuelva algo. Una vez que l deuelve, declaro cursos.
			const data = await fetch('cursos.json');
			const cursosArchivo = await data.json();
			commit('llenarCursos', cursosArchivo)
		}
	}
})

new Vue({
	el:'#app',
	store: vuexstore
})


