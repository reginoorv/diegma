import { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import SectionHeader from "@/components/ui/section-header";
import { apiRequest } from "@/lib/queryClient";

const formSchema = z.object({
  name: z.string().min(2, "Nama harus diisi"),
  project: z.string().min(3, "Deskripsi proyek harus diisi"),
  email: z.string().email("Format email tidak valid"),
  phone: z.string().optional(),
  message: z.string().min(10, "Pesan terlalu pendek").max(500, "Pesan terlalu panjang"),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  useEffect(() => {
    document.title = "Kontak | DIEGMA";
  }, []);

  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      project: "",
      email: "",
      phone: "",
      message: "",
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
  });

  const onSubmit = (values: FormValues) => {
    submitContact.mutate(values);
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Hubungi Kami" 
          subtitle="Kami siap membantu mewujudkan visi Anda tentang ruang ideal"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-lg p-8 shadow-md">
            <h3 className="text-2xl font-semibold mb-6">Konsultasikan Proyek Anda</h3>
            
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

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pesan*</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Ceritakan lebih detail tentang proyek dan kebutuhan Anda" 
                          {...field} 
                          className="px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary resize-none h-32"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-primary text-white font-medium py-3 px-6 rounded hover:bg-opacity-90 transition-colors"
                  disabled={submitContact.isPending}
                >
                  {submitContact.isPending ? "Mengirim..." : "Kirim Permintaan"}
                </Button>
              </form>
            </Form>
          </div>
          
          <div>
            <div className="bg-white rounded-lg p-8 shadow-md mb-8">
              <h3 className="text-2xl font-semibold mb-6">Informasi Kontak</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="fas fa-map-marker-alt text-primary"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Alamat</h4>
                    <p className="text-gray-500">Jl. Sudirman No. 123, Jakarta 10220</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="fas fa-envelope text-primary"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Email</h4>
                    <p className="text-gray-500">info@diegma.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="fas fa-phone text-primary"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Telepon</h4>
                    <p className="text-gray-500">+62 21 1234 5678</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="fas fa-clock text-primary"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Jam Kerja</h4>
                    <p className="text-gray-500">Senin - Jumat: 09:00 - 17:00</p>
                    <p className="text-gray-500">Sabtu: 09:00 - 14:00</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md h-64">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.400123493953!2d106.82347607596348!3d-6.208605593798897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3f193a081d3%3A0xe260dd5ec799c78c!2sJl.%20Jend.%20Sudirman%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1683021956289!5m2!1sid!2sid" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="DIEGMA Studio Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
