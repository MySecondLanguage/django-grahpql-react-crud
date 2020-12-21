from graphene_django import DjangoObjectType
import graphene

from .models import Employee

class EmployeeType(DjangoObjectType):
    class Meta:
        model = Employee


class DeleteEmployee(graphene.Mutation):
    ok = graphene.Boolean()

    class Arguments:
        id = graphene.ID()

    @classmethod
    def mutate(cls, root, info, **kwargs):
        obj = Employee.objects.get(pk=kwargs["id"])
        obj.delete()
        return cls(ok=True)




class CreateEmployee(graphene.Mutation):
    id = graphene.Int()
    name = graphene.String()
    role = graphene.String()

    class Arguments:
        name = graphene.String()
        role = graphene.String()

    def mutate(self, info, name, role):
        employee = Employee(name=name, role=role)
        employee.save()

        return CreateEmployee(
            id=employee.id,
            name=employee.name,
            role=employee.role,
        )




class Mutation(graphene.ObjectType):
    create_employee = CreateEmployee.Field()
    delete_employee = DeleteEmployee.Field()

class Query(graphene.ObjectType):
    employees = graphene.List(EmployeeType)

    def resolve_employees(self, info):
        return Employee.objects.all()

schema = graphene.Schema(
    query=Query,
    mutation=Mutation
)