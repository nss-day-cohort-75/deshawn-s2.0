namespace Deshawns.Models.DTOs;

public class WalkerDTO
{
    public int Id { get; set; }
    public string WalkerName { get; set; }
    public List<CityDTO> Cities { get; set; }
}