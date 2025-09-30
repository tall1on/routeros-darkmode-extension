import '../styles/routeros-dark.scss';

(function ()
{
    console.log(document.title.includes('RouterOS'));
    if (document.title.includes('RouterOS'))
    {
        document.body.classList.add('mikrotik-ros')
    }
})();