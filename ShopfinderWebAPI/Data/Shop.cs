using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopfinderWebAPI.Data
{
    public class Shop
    {
        public int Id { get; set; }

        public string ShopName { get; set; }

        public string Address { get; set; }

        public string Details { get; set; }

        public string ContactNo { get; set; }
    }
}
