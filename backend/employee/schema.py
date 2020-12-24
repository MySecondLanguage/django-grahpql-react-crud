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


class UpdateEmployee(graphene.Mutation):
    class Arguments:
        # The input arguments for this mutation
        id = graphene.ID()
        name = graphene.String(required=True)
        role = graphene.String(required=True)
       

    # The class attributes define the response of the mutation
    employee = graphene.Field(EmployeeType)

    @classmethod
    def mutate(cls, root, info, name, role, id):
        employee = Employee.objects.get(pk=id)
        employee.name = name
        employee.role = role
        employee.save()
        # Notice we return an instance of this mutation
        return UpdateEmployee(employee=employee)


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
    update_employee = UpdateEmployee.Field()

class Query(graphene.ObjectType):
    employees = graphene.List(EmployeeType)
    
    employee_by_id = graphene.Field(EmployeeType, id=graphene.String())

    def resolve_employees(self, info):
        return Employee.objects.all()

    def resolve_employee_by_id(root, info, id):
        return Employee.objects.get(pk=id)

schema = graphene.Schema(
    query=Query,
    mutation=Mutation
)