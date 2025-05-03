import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SectionHeader from "../ui/section-header";
import { apiRequest } from "@/lib/queryClient";

const formSchema = z.object({
  name: z.string().min(2, "Nama harus diisi"),
  project: z.string().min(3, "Deskripsi proyek harus diisi"),
  email: z.string().email("Format email tidak valid"),
  phone: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      project: "",
      email: "",
      phone: "",
    },
  });

  const submitContact = useMutation({
    mutationFn: async (values: FormValues) => {
      const response = await apiRequest("POST", "/api/contacts", values);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Sukses!",
        description: "Terima kasih! Kami akan menghubungi Anda segera.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Gagal mengirim pesan",
        description: error.message || "Terjadi kesalahan. Silakan coba lagi.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    submitContact.mutate(values);
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <SectionHeader 
          title="Konsultasikan Proyek Anda" 
          subtitle="Hubungi kami untuk mendiskusikan kebutuhan desain interior Anda dan dapatkan konsultasi gratis."
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="relative rounded-lg overflow-hidden h-full min-h-[400px]">
            <img 
              src="https://images.unsplash.com/photo-1615529162924-f8605388461d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80" 
              alt="DIEGMA Studio" 
              className="w-full h-full object-cover"
            />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gray-900 bg-opacity-75 text-white">
              <h3 className="font-semibold text-lg mb-4">DIEGMA Studio</h3>
              <p className="flex items-center mb-2">
                <i className="fas fa-map-marker-alt mr-3"></i>
                Jl. Sudirman No. 123, Jakarta 10220
              </p>
              <p className="flex items-center mb-2">
                <i className="fas fa-envelope mr-3"></i>
                info@diegma.com
              </p>
              <p className="flex items-center">
                <i className="fas fa-phone mr-3"></i>
                +62 21 1234 5678
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-8 shadow-md">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama*</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Masukkan nama Anda" 
                          {...field} 
                          className="px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="project"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Proyek Anda*</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Jelaskan proyek Anda secara singkat" 
                          {...field} 
                          className="px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email*</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="email@contoh.com" 
                          {...field} 
                          className="px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nomor Telepon (opsional)</FormLabel>
                      <FormControl>
                        <Input 
                          type="tel" 
                          placeholder="+62 8xx xxxx xxxx" 
                          {...field} 
                          className="px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-primary text-white font-medium py-3 px-6 rounded hover:bg-opacity-90 transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Mengirim..." : "Kirim Permintaan"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
