import { Server, Model } from "miragejs"

export function makeServer() {
  let server = new Server({

    models: {
        reminder: Model,
    },

    seeds(server) {
      server.create("reminder", { title: "Do the Paint" })
      server.create("reminder", { title: "Buy new Furniture" })
    },

    routes() {
      this.namespace = "api"

      this.get("/reminders", (schema) => {
        return schema.reminders.all()
      })

      this.post("/reminder/store", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.reminders.create(attrs)
      })

      this.del("/reminder/delete/:id", (schema, request) => {
        let id = request.params.id
        schema.reminders.find(id).destroy();
        return 'success'
      });
    },
  })

  return server
}