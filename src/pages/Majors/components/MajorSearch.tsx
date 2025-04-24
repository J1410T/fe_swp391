import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MajorSearchProps {
  onSearch: (params: { code?: string; name?: string }) => void;
  onAddNew: () => void;
}

/**
 * Component tìm kiếm và lọc ngành học
 */
export function MajorSearch({ onSearch, onAddNew }: MajorSearchProps) {
  const [searchType, setSearchType] = useState<"name" | "code">("name");
  const [nameQuery, setNameQuery] = useState("");
  const [codeQuery, setCodeQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Tạo object params cho API endpoint "/majors?code=&name="
    const searchParams = {
      code: searchType === "code" ? codeQuery : "",
      name: searchType === "name" ? nameQuery : ""
    };
    
    onSearch(searchParams);
  };

  const handleClearSearch = () => {
    if (searchType === "name") {
      setNameQuery("");
    } else {
      setCodeQuery("");
    }
    
    onSearch({ code: "", name: "" });
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-md border border-orange-100 mb-8 transition-all duration-300 hover:shadow-lg">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="w-full lg:w-3/4">
          <Tabs defaultValue="name" value={searchType} onValueChange={(value) => setSearchType(value as "name" | "code")} className="w-full">
            <div className="flex flex-wrap items-center mb-3">
              <Label className="mr-3 text-sm font-medium text-gray-600">Tìm kiếm theo:</Label>
              <TabsList className="bg-orange-50 p-0.5 rounded-lg border border-orange-100">
                <TabsTrigger 
                  value="name" 
                  className="px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-sm data-[state=active]:border-b-2 data-[state=active]:border-orange-400"
                >
                  Tên ngành học
                </TabsTrigger>
                <TabsTrigger 
                  value="code" 
                  className="px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-sm data-[state=active]:border-b-2 data-[state=active]:border-orange-400"
                >
                  Mã ngành
                </TabsTrigger>
              </TabsList>
            </div>
            
            <form onSubmit={handleSearch} className="relative w-full">
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <div className="flex-grow">
                  <TabsContent value="name" className="mt-0">
                    <div className="relative group">
                      <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none group-hover:text-orange-500 transition-colors duration-200" />
                      <Input
                        className="pl-10 pr-10 py-2.5 border-gray-200 focus-visible:ring-orange-200 focus-visible:border-orange-300 rounded-lg shadow-sm transition-all duration-200 hover:border-orange-200 w-full"
                        placeholder="Nhập tên ngành học cần tìm..."
                        value={nameQuery}
                        onChange={(e) => setNameQuery(e.target.value)}
                      />
                      {nameQuery && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-colors duration-200"
                          onClick={handleClearSearch}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="code" className="mt-0">
                    <div className="relative group">
                      <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none group-hover:text-orange-500 transition-colors duration-200" />
                      <Input
                        className="pl-10 pr-10 py-2.5 border-gray-200 focus-visible:ring-orange-200 focus-visible:border-orange-300 rounded-lg shadow-sm transition-all duration-200 hover:border-orange-200 w-full"
                        placeholder="Nhập mã ngành cần tìm..."
                        value={codeQuery}
                        onChange={(e) => setCodeQuery(e.target.value)}
                      />
                      {codeQuery && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-colors duration-200"
                          onClick={handleClearSearch}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TabsContent>
                </div>
                
                <div className="md:flex-shrink-0">
                  <Button 
                    type="submit" 
                    size="sm"
                    className="bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 font-medium w-full md:w-auto"
                  >
                    <Search className="h-3.5 w-3.5 mr-2" />
                    Tìm kiếm
                  </Button>
                </div>
              </div>
            </form>
          </Tabs>
        </div>
        <Button 
          onClick={onAddNew} 
          className="w-full top-5 lg:w-auto bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 font-medium flex items-center justify-center whitespace-nowrap"
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm ngành học mới
        </Button>
      </div>
    </div>
  );
}
