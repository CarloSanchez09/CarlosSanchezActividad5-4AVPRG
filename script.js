document.addEventListener("DOMContentLoaded", () => {
    const clienteForm = document.getElementById("clienteForm");
    const listaClientes = document.getElementById("listaClientes");
    const clienteIndex = document.getElementById("clienteIndex");
    const guardarBtn = document.getElementById("guardarBtn");

    let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

    function actualizarLista() {
        listaClientes.innerHTML = "";
        clientes.forEach((cliente, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${cliente.nombre} - ${cliente.telefono} - ${cliente.email} - Saldo: $${cliente.saldo}</span>
                <button onclick="editarCliente(${index})">✏️</button>
                <button onclick="eliminarCliente(${index})">❌</button>
            `;
            listaClientes.appendChild(li);
        });
    }

    window.editarCliente = (index) => {
        const cliente = clientes[index];
        document.getElementById("nombre").value = cliente.nombre;
        document.getElementById("telefono").value = cliente.telefono;
        document.getElementById("email").value = cliente.email;
        document.getElementById("saldo").value = cliente.saldo;
        clienteIndex.value = index;
        guardarBtn.textContent = "Actualizar Cliente";
    };

    window.eliminarCliente = (index) => {
        if (confirm("¿Estás seguro de eliminar este cliente?")) {
            clientes.splice(index, 1);
            localStorage.setItem("clientes", JSON.stringify(clientes));
            actualizarLista();
        }
    };

    clienteForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const telefono = document.getElementById("telefono").value;
        const email = document.getElementById("email").value;
        const saldo = parseFloat(document.getElementById("saldo").value);
        const index = clienteIndex.value;

        if (index === "") {
            clientes.push({ nombre, telefono, email, saldo });
        } else {
            clientes[index] = { nombre, telefono, email, saldo };
            clienteIndex.value = "";
            guardarBtn.textContent = "Registrar Cliente";
        }

        localStorage.setItem("clientes", JSON.stringify(clientes));
        actualizarLista();
        clienteForm.reset();
    });

    actualizarLista();
});
