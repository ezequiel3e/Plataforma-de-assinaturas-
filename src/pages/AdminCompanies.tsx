
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Edit, Trash, Building } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// Dados de exemplo
const mockCompanies = [
  { id: 1, name: "Empresa A", address: "Rua A, 123, São Paulo - SP", employees: 45, branches: 3, status: "active" },
  { id: 2, name: "Empresa B", address: "Av. B, 456, Rio de Janeiro - RJ", employees: 78, branches: 5, status: "active" },
  { id: 3, name: "Empresa C", address: "Rua C, 789, Belo Horizonte - MG", employees: 32, branches: 2, status: "inactive" },
  { id: 4, name: "Empresa D", address: "Av. D, 1011, Brasília - DF", employees: 54, branches: 1, status: "active" },
];

const AdminCompanies = () => {
  const [companies, setCompanies] = useState(mockCompanies);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    employees: 0,
    branches: 0,
    status: "active"
  });
  
  const { toast } = useToast();

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateCompany = () => {
    const newCompany = {
      id: companies.length > 0 ? Math.max(...companies.map(company => company.id)) + 1 : 1,
      ...formData
    };
    setCompanies([...companies, newCompany]);
    setIsCreateDialogOpen(false);
    resetForm();
    toast({
      title: "Empresa criada",
      description: "A empresa foi criada com sucesso.",
    });
  };

  const handleEditCompany = () => {
    const updatedCompanies = companies.map(company => 
      company.id === selectedCompany.id ? { ...company, ...formData } : company
    );
    setCompanies(updatedCompanies);
    setIsEditDialogOpen(false);
    resetForm();
    toast({
      title: "Empresa atualizada",
      description: "As informações da empresa foram atualizadas com sucesso.",
    });
  };

  const handleDeleteCompany = () => {
    const updatedCompanies = companies.filter(company => company.id !== selectedCompany.id);
    setCompanies(updatedCompanies);
    setIsDeleteDialogOpen(false);
    setSelectedCompany(null);
    toast({
      title: "Empresa excluída",
      description: "A empresa foi excluída com sucesso.",
    });
  };

  const openEditDialog = (company) => {
    setSelectedCompany(company);
    setFormData({
      name: company.name,
      address: company.address,
      employees: company.employees,
      branches: company.branches,
      status: company.status
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (company) => {
    setSelectedCompany(company);
    setIsDeleteDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      address: "",
      employees: 0,
      branches: 0,
      status: "active"
    });
    setSelectedCompany(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsCreateDialogOpen(true);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h1 className="text-2xl font-bold tracking-tight">Gestão de Empresas</h1>
          <Button className="flex items-center" onClick={openCreateDialog}>
            <Plus className="h-4 w-4 mr-2" /> Nova Empresa
          </Button>
        </div>

        {/* Search Bar */}
        <div className="flex w-full items-center space-x-2">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar empresas..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Companies Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredCompanies.map((company) => (
            <div key={company.id} className="bg-white border rounded-lg overflow-hidden">
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-100 mr-3 flex items-center justify-center">
                      <Building className="h-5 w-5 text-gray-500" />
                    </div>
                    <h3 className="text-lg font-semibold">{company.name}</h3>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    company.status === "active" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    {company.status === "active" ? "Ativa" : "Inativa"}
                  </span>
                </div>
                
                <p className="mt-3 text-sm text-gray-500">{company.address}</p>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Funcionários</p>
                    <p className="text-lg font-semibold">{company.employees}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Filiais</p>
                    <p className="text-lg font-semibold">{company.branches}</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t px-5 py-3 flex justify-end space-x-2 bg-gray-50">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center"
                  onClick={() => openEditDialog(company)}
                >
                  <Edit className="h-4 w-4 mr-1" /> Editar
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={() => openDeleteDialog(company)}
                >
                  <Trash className="h-4 w-4 mr-1" /> Excluir
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="text-center py-10">
            <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <Building className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma empresa encontrada</h3>
            <p className="mt-1 text-sm text-gray-500">
              Tente ajustar os termos de busca ou adicione uma nova empresa.
            </p>
          </div>
        )}
      </div>

      {/* Create Company Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Nova Empresa</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Endereço
              </Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="employees" className="text-right">
                Funcionários
              </Label>
              <Input
                id="employees"
                name="employees"
                type="number"
                value={formData.employees}
                onChange={handleNumberInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="branches" className="text-right">
                Filiais
              </Label>
              <Input
                id="branches"
                name="branches"
                type="number"
                value={formData.branches}
                onChange={handleNumberInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleSelectChange}
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="active">Ativa</option>
                <option value="inactive">Inativa</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleCreateCompany}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Company Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Empresa</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Nome
              </Label>
              <Input
                id="edit-name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-address" className="text-right">
                Endereço
              </Label>
              <Input
                id="edit-address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-employees" className="text-right">
                Funcionários
              </Label>
              <Input
                id="edit-employees"
                name="employees"
                type="number"
                value={formData.employees}
                onChange={handleNumberInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-branches" className="text-right">
                Filiais
              </Label>
              <Input
                id="edit-branches"
                name="branches"
                type="number"
                value={formData.branches}
                onChange={handleNumberInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-status" className="text-right">
                Status
              </Label>
              <select
                id="edit-status"
                name="status"
                value={formData.status}
                onChange={handleSelectChange}
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="active">Ativa</option>
                <option value="inactive">Inativa</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleEditCompany}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Company Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Excluir Empresa</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Tem certeza que deseja excluir a empresa {selectedCompany?.name}?</p>
            <p className="text-sm text-gray-500 mt-2">Esta ação não pode ser desfeita.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancelar</Button>
            <Button variant="destructive" onClick={handleDeleteCompany}>Excluir</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default AdminCompanies;
