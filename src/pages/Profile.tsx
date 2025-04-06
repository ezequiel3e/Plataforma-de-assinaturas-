import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Camera, User } from "lucide-react";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "João Silva",
    email: "joao.silva@exemplo.com",
    phone: "(11) 98765-4321",
    company: "Empresa A",
    role: "Colaborador",
    profileImage: ""
  });

  const [formData, setFormData] = useState({
    name: userProfile.name,
    email: userProfile.email,
    phone: userProfile.phone,
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Estado para controlar a imagem selecionada para upload
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedImage(file);
      
      // Criar URL para preview
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) {
      toast({
        title: "Nenhuma imagem selecionada",
        description: "Por favor, selecione uma imagem para continuar.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulação de upload - em implementação real seria uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Atualizar o perfil do usuário com a nova imagem
      setUserProfile({
        ...userProfile,
        profileImage: previewUrl
      });
      
      toast({
        title: "Foto atualizada",
        description: "Sua foto de perfil foi atualizada com sucesso.",
      });
      
      // Limpar estados após upload bem-sucedido
      setSelectedImage(null);
      
    } catch (error) {
      toast({
        title: "Erro no upload",
        description: "Não foi possível fazer o upload da imagem. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulação de atualização - em uma implementação real seria uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUserProfile({
        ...userProfile,
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      });
      
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso.",
      });
      
    } catch (error) {
      toast({
        title: "Erro na atualização",
        description: "Não foi possível atualizar seu perfil. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos de senha.",
        variant: "destructive"
      });
      return;
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Senhas não coincidem",
        description: "A nova senha e a confirmação devem ser iguais.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulação de atualização - em uma implementação real seria uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setFormData({
        ...formData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      
      toast({
        title: "Senha atualizada",
        description: "Sua senha foi alterada com sucesso.",
      });
      
    } catch (error) {
      toast({
        title: "Erro na atualização",
        description: "Não foi possível atualizar sua senha. Verifique sua senha atual e tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Perfil</h1>
          <p className="text-muted-foreground">
            Gerencie suas informações pessoais e senha.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Informações do Usuário */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>
                Atualize suas informações pessoais de perfil.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleProfileUpdate}>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center mb-6">
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="relative cursor-pointer group">
                        <Avatar className="w-24 h-24 border-2 border-gray-200">
                          {userProfile.profileImage ? (
                            <AvatarImage src={userProfile.profileImage} alt={userProfile.name} />
                          ) : (
                            <AvatarFallback className="bg-gray-200 text-gray-400">
                              <User className="h-12 w-12" />
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Camera className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Atualizar foto de perfil</DialogTitle>
                        <DialogDescription>
                          Selecione uma nova imagem para seu perfil.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="flex flex-col gap-4 py-4">
                        {previewUrl && (
                          <div className="flex justify-center mb-4">
                            <Avatar className="w-32 h-32">
                              <AvatarImage src={previewUrl} alt="Preview" />
                              <AvatarFallback className="bg-gray-200">
                                <User className="h-12 w-12 text-gray-400" />
                              </AvatarFallback>
                            </Avatar>
                          </div>
                        )}
                        
                        <Input 
                          id="picture" 
                          type="file" 
                          accept="image/*"
                          onChange={handleProfileImageChange}
                        />
                      </div>
                      
                      <DialogFooter>
                        <Button 
                          type="button" 
                          onClick={handleImageUpload} 
                          disabled={isLoading || !selectedImage}
                        >
                          {isLoading ? "Salvando..." : "Salvar foto"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  
                  <p className="text-sm text-muted-foreground mt-2">
                    Clique na imagem para alterar sua foto
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">Empresa</Label>
                  <Input
                    id="company"
                    value={userProfile.company}
                    disabled
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role">Cargo</Label>
                  <Input
                    id="role"
                    value={userProfile.role}
                    disabled
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Salvando..." : "Salvar Alterações"}
                </Button>
              </CardFooter>
            </form>
          </Card>
          
          {/* Alterar Senha */}
          <Card>
            <CardHeader>
              <CardTitle>Alterar Senha</CardTitle>
              <CardDescription>
                Atualize sua senha periodicamente para maior segurança.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handlePasswordUpdate}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Senha Atual</Label>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nova Senha</Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Atualizando..." : "Atualizar Senha"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
