namespace Florist.Entity
{
    public class Urun
    {
        public int Id { get; set; }
        public string Ad { get; set; } = string.Empty;

        public string Renk { get; set; } = string.Empty;

        public decimal Fiyati { get; set; }

        public string Resim { get; set; } = string.Empty;
        public string Aciklama { get; set; } = string.Empty;


    }
}
